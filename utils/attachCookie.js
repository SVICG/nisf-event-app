

const attachCookie = ({res, token}) => {
    const day = 1000*60 *60 *24
    res.cookie('token', token, {
        httpOnly:true,
        expires:new Date(Date.now()+ day),
        secure: process.env.NODE_ENV === 'production',
    });
};

export default attachCookie