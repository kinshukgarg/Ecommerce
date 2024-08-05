import mongoose from 'mongoose';

export const connectDb = () => {
    mongoose.connect('mongodb+srv://admin:iBOK5TKcKGg4j7Zz@cluster0.oqosrqo.mongodb.net/', {
        dbName: 'Ecommerce'
    }).then(c => console.log(`DB connected to ${c.connection.host}`))
    .catch(e => console.log(e));
}
