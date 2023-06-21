let fs = require('fs')
let fs_extra = require('fs-extra')
const readline = require('readline');
let path = require('node:path')
let sourceDir = path.join(__dirname, "../../PHP/comanda")
const chokidar = require('chokidar')
let destinationDir = "C:\\AppServ\\www\\comanda"

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const watcher = chokidar.watch(destinationDir, { persistent: true });
//watcher.on('change', path => log(`File ${path} has been changed`))

const isModified = async () => {
  watcher.on('change', path => console.log(`File ${path} has been changed`))
}

isModified()

const prepareFolder = async() => {
  if (!fs.existsSync(destinationDir)){
      fs.mkdirSync(destinationDir, {
      recursive: true
    })
  } 
}

const copyFolder = async() => {
  fs_extra.copy(sourceDir, destinationDir, (error) => {
    if(error){
      throw error
    } else {
      console.log('Arquivos copiados com sucesso!')
      rl.question('Repetir o processo ? (y - Sim, n - Nao)', (value) => {
        if (value === 'y'){
          copyFolder()
        } else {
          process.exit()
        }
      })
    }
  })
}

isModified()
prepareFolder()
copyFolder()
