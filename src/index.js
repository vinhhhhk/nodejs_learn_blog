const express = require('express');
const morgan = require('morgan');
const path = require('path');
const handlebars= require ('express-handlebars')
var methodOverride = require('method-override')
const { engine } = require('express-handlebars');
const SortMiddleware=require('./app/middleware/sortMiddware')
const app = express();

const db=require('./config/db');

//Connect to DB
db.connect();

const route = require('./routes');
app.use(express.json());
app.use(
    express.urlencoded({
        extended: true,
    }),
);

app.use(SortMiddleware)
// Overrider 
app.use(methodOverride('_method'))

// public file by using static
app.use(express.static(path.join(__dirname, 'public')));
// app.use(morgan('combined'))

//Template engine
app.engine(
    'hbs',
    engine({
        extname: '.hbs',
        helpers: {
            sum:(a , b) => a + b,
            sortable:(field, sort) => {
                const sortType= field === sort.column ? sort.type : 'default'
                const icons = {
                    default:'data:image/svg+xml,%3Csvg xmlns="http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg" width="16" height="16" viewBox="0 0 8 8"%3E%3Cpath fill="currentColor" d="M4 0L1 3h6L4 0zM1 5l3 3l3-3H1z"%2F%3E%3C%2Fsvg%3E',
                    asc:'data:image/svg+xml,%3Csvg xmlns="http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg" width="16" height="16" viewBox="0 0 16 16"%3E%3Cpath fill="currentColor" d="m12.927 2.573l3 3A.25.25 0 0 1 15.75 6H13.5v6.75a.75.75 0 0 1-1.5 0V6H9.75a.25.25 0 0 1-.177-.427l3-3a.25.25 0 0 1 .354 0ZM0 12.25a.75.75 0 0 1 .75-.75h7.5a.75.75 0 0 1 0 1.5H.75a.75.75 0 0 1-.75-.75Zm0-4a.75.75 0 0 1 .75-.75h4.5a.75.75 0 0 1 0 1.5H.75A.75.75 0 0 1 0 8.25Zm0-4a.75.75 0 0 1 .75-.75h2.5a.75.75 0 0 1 0 1.5H.75A.75.75 0 0 1 0 4.25Z"%2F%3E%3C%2Fsvg%3E',
                    desc:'data:image/svg+xml,%3Csvg xmlns="http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg" width="16" height="16" viewBox="0 0 16 16"%3E%3Cpath fill="currentColor" d="M0 4.25a.75.75 0 0 1 .75-.75h7.5a.75.75 0 0 1 0 1.5H.75A.75.75 0 0 1 0 4.25Zm0 4a.75.75 0 0 1 .75-.75h4.5a.75.75 0 0 1 0 1.5H.75A.75.75 0 0 1 0 8.25Zm0 4a.75.75 0 0 1 .75-.75h2.5a.75.75 0 0 1 0 1.5H.75a.75.75 0 0 1-.75-.75ZM13.5 10h2.25a.25.25 0 0 1 .177.427l-3 3a.25.25 0 0 1-.354 0l-3-3A.25.25 0 0 1 9.75 10H12V3.75a.75.75 0 0 1 1.5 0V10Z"%2F%3E%3C%2Fsvg%3E',
                }
                const types = {
                    default:'desc',
                    asc:'desc',
                    desc:'asc',
                }
                const icon= icons[sortType];
                const type= types[sortType];

                return `<a href="?_sort&column=${field}&type=${type}">
                            <img src='${icon}' alt="">
                    </a>`
            }
        },
        
    }),
);
app.set('view engine', 'hbs');
app.set('views',path.join(__dirname,'resources','views', ),);

const port = 3001;
app.listen(port, () => console.log(`Example app listening on port ${port}`));

//Routes init
route(app);
