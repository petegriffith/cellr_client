# cellr 0.1.0

A project to help keep track of what Wines my wife and I like.

NOTE: The server is on a different repo. Please see cellr_server if you want to take a look/run it.

<table align="center">
  <thead>
    <tr>
      <th colspan="2">Technologies</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Languages</td>
      <td>
        <img alt="TypeScript" src="https://img.shields.io/badge/-TypeScript-000?&logo=typescript" />
      </td>
    </tr>
    <tr>
      <td>Front-End</td>
      <td>
        <img alt="Vue" src="https://img.shields.io/badge/-Vue%203.0-000?logo=vue.js" />
        <img alt="Quasar" src="https://img.shields.io/badge/-Quasar-000?logo=quasar" />
        <img alt="HTML" src="https://img.shields.io/badge/-HTML-000?logo=html5" />
        <img alt="CSS" src="https://img.shields.io/badge/-CSS-000?logo=css3" />
      </td>
    </tr>
    <tr>
      <td>Back-End</td>
      <td>
        <img alt="Express" src="https://img.shields.io/badge/-Express-000?logo=express" />
        <img alt="Knex" src="https://img.shields.io/badge/-Knex-000?logo=data%3Aimage%2Fpng%3Bbase64%2CiVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAMAAABg3Am1AAACQ1BMVEUAAADfYyXfZCTgYyTgYybgZCbhZCXhZCbiYiXgYybfYybgZCbhYibhYybhZCbfYyXgYyXgYybgZCXgZCbhZCbgYyXgYybgZCXgZCbhYyXhYybhZCXhZCbgYyXgYybgZCbhYyXhZCXhZCbgYyXgYybgZCXhYyXhZCbgYyXgYybgZCXhZCbgYybgZCXhYyXhZCXhZCbgYybhZCXhZCbgZCXhZCbgYybgZCXhYyXhZCbgZCbhYybhZCbhYyXhZCXgZCXgZCbgYybgZCbhZCbgYybgZCbhYyXhZCXgZCbhZCbhZCbhZCbhZCbhZCbgYybgZCbhZCbgZCbhZCbhZCbhZCbhZCbgZCbhZCbhZCXhZCbhZCXhZCbhZCbhZCbhZCbhZCbhZCbhZCbhZCbhZCbhZCbhZCbhZCbhZCbhZCbhZCbhZCbhZCbhZCbhZCbhZCbhZCbhZCbhZCbhZCbhZCbhZCbhZCbhZCbhZCbhZCbhZCbhZCbhZCbhZCbhZCbhZCbhZCbhZCbhZCbhZCbhZCbhZCbhZCbhZCbhZCbhZCbhZCbhZCbhZCbhZCbhZCbhZCbhZCbhZCbhZCbhZCbhZCbhZCbhZCbhZCbhZCbhZCbhZCbhZCbhZCbhZCbhZCbhZCbhZCbhZCbhZCbhZCbhZCbhZCbhZCbhZCbhZCbhZCbhZCbhZCbhZCbhZCbhZCbhZCbhZCbhZCbhZCbhZCbhZCbhZCbhZCbhZCbhZCbhZCbhZCbhZCbhZCbhZCbhZCbhZCbhZCbhZCZEchSEAAAAwHRSTlMAAQEBAQEBAQECAwMDAwMGBgYGBgYHBwcHBwcHBwgICAgICAkJCQkJDAwMDA8PDw8PEBAQERETExMTGBgYGRkaGh0dHR8fHx8gICEiIyUmJiYqKistLi8vMTEyMjc4PT4%2FRUxNTk9UVVhZWltcaWpsbW5wcXJzdHV2d3h6e4GCg4WGiouMj5CRk5WWl5iZmpucsLG2uLm6u7y%2FwMHCzM3O0tPU1dfY2d7f4OHj5ebn6Onq7O3u7%2FDx8vX2%2BPr7%2FP7nOBapAAADrUlEQVR42o3V83dj6x7H8c%2FYtm3btm3baG81yp2MikFtI1PnnFpp9%2FtPO3vvJF3pJGtWXz8%2Ffr5QCBEVR2WKdt9Wr9yCBEmL62gZq97Y00X7NikSstU76eDUvBp4rL95FPdWXk%2BgadVL%2BHeKbLszc%2B8pmAsuybaoEd5Vwid5fQaHgjkhUV5Z0AmEybayGeOMgp2Hts2yTGrFlipbJOQrlGKIkWVdFbavskysgnD1dM9xTtI76PiyQaaTbkw%2FBsp0pxg826ULTtcj%2BeVi5IdvP24AsdLEB4nVmEoTH0yVKoHU4%2B%2BKgTj5ZWLypDYC8XOj3XSrjZrsBhoNLG%2Fkt%2BNzMz65v%2BnB1Y5XW%2BIFBVgeWUUAwwNNBt3oiNmiP4wuxq%2Fs9aFYOHHwdRl%2BnxXsTqW7HVPbqxGSNUEaGoElNz52vUKZ6cLUcFlSAtyQpqZg%2BT1HoUVhq7%2F6tNAAo%2FB5CjS0AVEKNEY%2BU91ARDJ46FZ%2F5RVQO0lee29Jt1tznsyU5QFQNnJ8MnTzXNNwF%2FBAayZq0ZP0LiLkBuo%2Bh6V%2BG5AIvJaeYypwfCjA9ER6Dfw6VdWa1YipXNF1eP0oBeOAVAg4%2B0t9nUChtN%2BA6n%2BwtScclZZE1ODXdPrEDQMK%2BsvUrxCM%2BNhYDz6Nzq2yzXlZSQ8O2RwE6ny3Un6r3ncS6EOoCVS%2BnC%2FbVmcTPp7Yb%2FHWkfrINMQ60vUTJ5rxq4lYJh393o7NXQ3GId%2BlB0tDnECBdMSAkh941UWrAlNjVmvVSd%2BzPsFU6HAUYnomhQG%2F%2Bn9NDftcB9Qqgq60xws0Ya3344bpmoduJI8f5v04y6wn2S23pJv75DXJDby6Uk83DyRHArXj5DMmKPjaGiD5mR18BU%2Bu%2BiZHKrS5v7Ekj5JuQLykyw2YXNMVyobY%2BDwsESOkE%2FBNGvmqDVO7u%2FKOgn3BzxV2%2BDTEHghz4Vc8TX%2FYGNNBN4xm8BgEqIpcrQCXktrwanfRgysPn%2BbPu%2BT3FovRCLinRNYGFrLZ8UBjqgdThvziwCh6dywVqJTGPUgswVT96%2F4YKRYwjm0PzzfIkd8j18fz0nYPFN%2BRadBPTO6TMm340gHvJJ113FVP4VA1SpZv2KrWyRIDRQqlACJkS8XWOkWWTW1wXsHOGTSvkC0M6IQseSXCRwX7f48uWPEeGhfKdhFcCnYvJ2OnbLPr4MXqJngsrzdxD%2FU3T6BmhpyQrt7JgQhpeztd%2B9Qb41qoWyrpO9xUr9xyR8l0tOJ%2FCvYfym4V4Nm8%2BxUAAAAASUVORK5CYII%3D" />
      </td>
    </tr>
    <tr>
      <td>Database</td>
      <td>
        <img alt="PostgreSQL" src="https://img.shields.io/badge/-PostgreSQL-000?logo=postgresql" />
      </td>
    </tr>
    <tr>
      <td>Testing</td>
      <td>
        Coming Soon
      </td>
    </tr>
  </tbody>
</table>

## Project Status

Frontend rework in progress using Quasar!

## Instillation and setup instructions

Fork, clone, and then

### Install dependencies

```bash
npm install
```

### Start the app in development mode (hot-code reloading, error reporting, etc.)

```bash
quasar dev
```

### Lint the files

```bash
npm run lint
```

### Build the app for production

```bash
quasar build
```

## Reflection

So far, this has been an excellent exercise in re-familiarizing myself with working with REST API design, as well as learning a big new framework in Quasar!
