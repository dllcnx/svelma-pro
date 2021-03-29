const chalk = require('chalk') //命令行颜色
const ora = require('ora') // 加载流程动画
const spinner_style = require('./spinner_style') //加载动画样式
const shell = require('shelljs') // 执行shell命令
const node_ssh = require('node-ssh') // ssh连接服务器
const inquirer = require('inquirer') //命令行交互
const zipFile = require('compressing2') // 压缩zip
const fs = require('fs') // nodejs内置文件模块
const path = require('path') // nodejs内置路径模块
const CONFIG = require('./config') // 配置

const SSH = new node_ssh();
let config; // 用于保存 inquirer 命令行交互后选择正式|测试版的配置

//logs
const defaultLog = log => console.log(chalk.blue(`---------------- ${log} ----------------`));
const errorLog = log => console.log(chalk.red(`---------------- ${log} ----------------`));
const successLog = log => console.log(chalk.green(`---------------- ${log} ----------------`));

//文件夹目录
const distZipPath = path.resolve(__dirname, `./smx-bundle.tar.gz`); //打包后地址(smx-bundle.tar.gz是文件名,不需要更改, 主要在config中配置 PATH 即可)



//压缩代码
const zipDist = async () => {
  const distDir = path.resolve(__dirname, '../' + config.OUTPUT_PATH);
  const loading = ora(defaultLog('正在压缩代码')).start();
  loading.spinner = spinner_style.arrow4;
  try {
    await zipFile.tgz.compressDir(distDir, distZipPath)
    successLog('压缩成功!');
  } catch (error) {
    errorLog(error);
    errorLog('压缩失败, 退出程序!');
    process.exit(); //退出流程
  }
  loading.stop();
}

//连接服务器
const connectSSH = async () => {
  const loading = ora(defaultLog('正在连接服务器')).start();
  loading.spinner = spinner_style.arrow4;
  try {

    const options = config.privateKey ? {
      host: config.SERVER_PATH,
      username: config.SSH_USER,
      privateKey: config.PRIVATE_KEY, //秘钥登录(推荐) 方式一
      tryKeyboard: true,
      port: config.PORT
    } : {
      host: config.SERVER_PATH,
      username: config.SSH_USER,
      password: config.PASSWORD, // 密码登录 方式二
      tryKeyboard: true,
      port: config.PORT
    }

    await SSH.connect(options);
    successLog('SSH连接成功!');
  } catch (error) {
    errorLog(error);
    errorLog('SSH连接失败!');
    process.exit(); //退出流程
  }
  loading.stop();
}



//传送zip文件到服务器
const uploadZipBySSH = async () => {
  //连接ssh
  await connectSSH();
  //线上目标文件清空
  await clearOldFile();




  const loading = ora(defaultLog('准备上传文件')).start();
  loading.spinner = spinner_style.arrow4;
  try {
    await SSH.putFiles([{
      local: distZipPath,
      remote: config.PATH + '/smx-bundle.tar.gz'
    }]); //local 本地 ; remote 服务器 ;
    successLog('上传成功!');
    loading.text = '正在解压文件';
    await runCommand('tar -zxvf  ./smx-bundle.tar.gz'); //解压

    // 是否备份文件
    if (config.BACKUP) {
      await runCommand(`mv ${config.PATH}/smx-bundle.tar.gz ${config.PATH}/${config.OLD_NAME}.${new Date().toLocaleDateString()}.tar.gz`); //解压完删除线上压缩包
    } else {
      await runCommand(`rm -rf ${config.PATH}/smx-bundle.tar.gz`); //解压完删除线上压缩包
    }


    //将目标目录改名
    if (config.RENAME) {
      await runCommand(`mv ${config.PATH}/${config.OLD_NAME}  ${config.PATH}/${config.RENAME}`);
    }


    // 后续扩展命令
    if (config.EXTENDS) {
      for (let v of config.EXTENDS) {
        await runCommand(v)
      }
    }

    SSH.dispose(); //断开连接
  } catch (error) {
    errorLog(error);
    errorLog('上传失败!');
    process.exit(); //退出流程
  }
  loading.stop();
}


//清空线上目标目录里的旧文件
const clearOldFile = async () => {

  try {
    await runCommand(`rm -r ${config.PATH}/${config.OLD_NAME}`);
  } catch {
    // console.log('服务器未发现原始部署文档');
  }
  if (config.RENAME) {
    try {
      await runCommand(`rm -r ${config.PATH}/${config.RENAME}`);
    } catch {
      // console.log('服务器未发现原始部署文档');
    }
  }

  if (config.CLEAR_OLDFILES) {
    const commands = ['ls', 'rm -rf *'];
    await Promise.all(commands.map(async (it) => {
      return await runCommand(it);
    }));
  }
}

// 删除本地上传后的打包文件
const deleteFile = function async () {
  delPath = distZipPath;
  try {
    /**
     * @des 判断文件或文件夹是否存在
     */
    if (fs.existsSync(delPath)) {
      fs.unlinkSync(delPath);
    } else {
      console.log('inexistence path：', delPath);
    }
  } catch (error) {
    console.log('删除本地打包文件失败', error);
  }
}



/**
 * 线上执行命令
 * @param {String} command 命令操作 如 ls
 */
const runCommand = async (command) => {
  const result = await SSH.exec(command, [], {
    cwd: config.PATH
  })
  // defaultLog(result);
}







//----------------------------------------发布程序---------------------------------------------------------//
const runUploadTask = async () => {
  console.log(chalk.yellow(`--------->  欢迎使用 Sm@rtMapX前端组 自动部署工具  <---------`));
  //压缩代码
  await zipDist();

  //连接服务器上传文件
  await uploadZipBySSH();

  //删除本地打包文件
  await deleteFile();

  successLog('大吉大利, 部署成功!');
  process.exit();
}

// 开始前的配置检查
/**
 * 
 * @param {Object} conf 配置对象
 */
const checkConfig = (conf) => {
  const checkArr = Object.entries(conf);
  checkArr.map(it => {
    const key = it[0];
    if (key === 'PATH' && conf[key] === '/') { //上传压缩包前会清空目标目录内所有文件
      errorLog('PATH 不能是服务器根目录!');
      process.exit(); //退出流程
    }
    if (!conf[key]) {
      errorLog(`配置项 ${key} 不能为空`);
      process.exit(); //退出流程
    }
  })
}
//--------------------------------------------------------------------------------------------------//

// 执行交互后 启动发布程序
inquirer
  .prompt([{
    type: 'confirm',
    message: '请确认您的上传目录及修改目录(RENAME)在服务器上没有被用于存储其他数据,以下部署将会删除这些目录',
    name: 'confirm',
  }, {
    type: 'list',
    message: '选择您的部署环境',
    name: 'env',
    choices: [{
      name: '测试环境',
      value: 'development'
    }, {
      name: '正式环境',
      value: 'production'
    }],
    when: function (answers) { // 当watch为true的时候才会提问当前问题
      return answers.confirm
    }
  }])
  .then(answers => {
    if (answers.confirm) {
      config = CONFIG[answers.env];
      if (!config.OUTPUT_PATH) {
        config.OUTPUT_PATH = 'dist';
      }

      if (!config.PORT) {
        config.PORT = 22;
      }

      const names = config.OUTPUT_PATH.split('/');
      if (names[names.length - 1]) {
        config.OLD_NAME = names[names.length - 1];
      } else {
        config.OLD_NAME = names[names.length - 2];
      }


      checkConfig(config); // 检查
      runUploadTask(); // 发布
    }
  });