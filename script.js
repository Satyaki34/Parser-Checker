let html=`  <label for="production-rule">Enter Your Production-rule:
<input type="text" id="production-rule" placeholder="Format: S=AB" required/>
</label>`;
document.body.querySelector('button').addEventListener('click',()=>{
    document.getElementsByTagName('label')[1].insertAdjacentHTML('afterend',`${html}`)
})