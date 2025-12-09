function clearForm() {
    document.getElementById('name').value='';
    document.getElementById('message').value='';
    document.getElementById('email').value='';
    document.getElementById('feedback').value='';
}

async function postData(){
    const name = document.getElementById('name').value;
    const message = document.getElementById('message').value;
    const email = document.getElementById('email').value;
    const feedback = document.getElementById('feedback').value;

    try{
        const response = await fetch('https://sheetdb.io/api/v1/cuuxgixy343ii',{
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                data: {
                    name:name,
                    message: message,
                    feedback:feedback,
                    email:email
                }
            })
        });
        const data = await response.json();
        console.log("POST data",response);




        clearForm();


    }catch(error){
        console.log("Error:", error);
    }
}

