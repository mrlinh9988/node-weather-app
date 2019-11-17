const express = require('express');
const path = require('path');
const hbs = require('hbs');
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express();
const port = process.env.PORT || 3000;

// Chú ý: nodemon chỉ restart server khi có sự thay đổi trong các file có đuôi như .js
// file .hbs thay đổi nhưng nodemon ko restart lại server 
// vậy nên muốn nodemon tự động restart cả những file có đuôi như .hbs thì cần gõ lệnh như sau: 
// nodemon app.js -e js,hbs
// Define path for Express config
const viewsPath = path.join(__dirname, '../templates/views')
const publicDirectoryPath = path.join(__dirname, '../public')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));



app.get('/', (req, res) => {
    res.render('index', {
        name: 'Nguyen Hai Linh',
        title: 'Home page'
    })
})


app.get('/weather', (req, res) => {

    if (!req.query.address) {
        return res.send({
            error: 'You must provide a address'
        });
    }

    // destructuring thành mặc định {}, nếu ko app sẽ lỗi
    // Chú ý: Nếu sử dụng destructuring thì nếu argument truyền vào là object thì nên set default là một {} để tránh lỗi
    geocode(req.query.address, (error, { latitude, longtitude, location } = {}) => {
        if (error) {
            return res.send({ error });
        }

        forecast(longtitude, latitude, (error, dataForecast) => {
            if (error) {
                return res.send({ error })
            }

            res.send({
                address: req.query.address,
                location,
                forecast: dataForecast

            })
        })
    })


})
// Chú ý: trong 1 request gửi lên server không thể có 2 respone trả về cho request đó được
app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Nguyen Hai Linh'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Nguyen Hai Linh'
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        name: 'Nguyen Hai Linh',
        title: '404',
        errorMessage: 'Help article not found'
    })
})

// Type anything not match with route above
app.get('*', (req, res) => {
    res.render('404', {
        name: 'Nguyen Hai Linh',
        title: '404',
        errorMessage: 'Page not found'
    })
});
/* ==> Phải để ở cuối vì express chạy từ trên xuống dưới nếu đúng route thì sẽ chuyển
hướng đến route đó. Nếu để ở trên express sẽ chạy route này trước nên sẽ luôn báo lỗi Not found
*/

app.listen(port, () => {
    console.log('Server is up on port 3000');
})

