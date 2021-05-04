const { ipcRenderer } = require('electron');
const ipc=ipcRenderer;


//close
closeBtn.addEventListener('click',()=>{
    ipc.send('closeApp');
})

//restore
restoreBtn.addEventListener('click',()=>{
    ipc.send('restoreApp');
})

//minimize
minBtn.addEventListener('click',()=>{
    ipc.send('minApp');
})