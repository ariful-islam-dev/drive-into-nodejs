# Drive Into NodeJS

## MongoDB

mongodb is a noSql database and it's a document database

#### Database Coonected

        mongoose.connect(DB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
        .then(()=>{
            console.log('Database is connected');
            app.listen(PORT, () => {
                console.log(`SERVER IS RUNNING ON PORT ${PORT}`);
            })
        })
        .catch(e=>{
            console.log(e.message);
        })
