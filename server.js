/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-console */
const http = require('http')
const path = require('path')
const fs = require('fs')

const server = http.createServer((req, res) => {
    switch (req.url) {
        case '/health':
            res.statusCode = 200
            res.setHeader('Content-Type', 'application/json')
            res.end('OK')
            break
        default:
            const fileurl = req.url.toString().substring(1).split('/')
            const filepath = path.join.apply(null, [__dirname, 'build', ...fileurl])
            fs.readFile(filepath, (err, content) => {
                if (!err) {
                    res.write(content)
                    res.end()
                } else {
                    const defaultFile = path.join(__dirname, 'build', 'index.html')
                    fs.readFile(defaultFile, (ignore, content) => {
                        res.write(content)
                        res.end()
                    })
                }
            })
            break
    }
})

const PORT = process.env.NODE_PORT || process.env.PORT || 3000

server.listen(PORT, '0.0.0.0', () => {
    // eslint-disable-next-line no-console
    console.log(`Server running on port ${PORT}`)
})
