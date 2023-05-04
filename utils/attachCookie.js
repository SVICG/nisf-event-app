

const attachCookie = ({res, token}) => {
    const day = 1000*60 *60 *24
    res.cookie('token', token, {
        httpOnly:true,
        //expires in one day
        expires:new Date(Date.now()+ day),
        //set secure when no longer in local environment
        secure: process.env.NODE_ENV === 'production',
    });
};

export default attachCookie