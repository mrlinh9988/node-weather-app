
fetch('http://localhost:3000/weather?address=Hanoi').then(res => {
    res.json().then(data => {
        if (data.error) {
            console.log(data.error);
        } else {
            //console.log(data.location);
            //console.log(data.forecast);
        }
    })
})



// Xử lý form
const weatherForm = document.querySelector('form')
const search = document.querySelector('#address')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2');

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();
    // Chặn refresh lại trang, mặc định khi click submit form sẽ refresh lại trang và ko lấy được dữ liệu trong form

    const location = search.value;

    messageOne.textContent = 'Loading...';
    messageTwo.textContent = '';

    // Fetch API từ location nhập vào từ form
    fetch('/weather?address=' + location).then(res => {
        res.json().then(data => {
            if (data.error) {
                //console.log(data.error);
                messageOne.textContent = data.error
            } else {
                // Print into browser
                messageOne.textContent = data.location;
                messageTwo.textContent = data.forecast;

            }
        })
    })
    
})

