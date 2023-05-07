

const attachCookie = ({res, token}) => {
    const day = 24*60*60*1000
    res.cookie('token', token, {
        //Flags the cookie to be accessible only by the web server.
        httpOnly:true,
        //expires in one day
        expires:new Date(Date.now()+ day),
        //set secure when no longer in local environment
        secure: process.env.NODE_ENV === 'production',
    });
};
export default attachCookie