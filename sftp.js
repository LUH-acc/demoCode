import Client from 'ssh2-sftp-client'
import { join } from 'path'

const sftp = new Client()

const deploy = async () => {
  try {
    await sftp.connect({
      port: '22',
      host: '123.249.23.211', // sftp地址
      username: 'root',
      password: '',
    })
    await sftp.uploadDir(join('./dist/'), '/tool/html/luh')
    // ./web/  要上传的本地的目录,vue build之后会生成的目录就是 web
    // await sftp.uploadDir(join('./src/assets/images/'), '/usr/share/nginx/html/frontend/images')
    console.log('上传成功！')
  } catch (e) {
    console.log(e)
  } finally {
    sftp.end()
  }
}
deploy()
