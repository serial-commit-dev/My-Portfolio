async function postData(){
     name = document.getElementById('name').value;
     message = document.getElementById('message').value;
     email = document.getElementById('email').value;
     feedback = document.getElementById('feedback').value;
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
    }catch(error){
        console.log("Error:", error);
    }
}

postData()