const otpGenerator = () => {
  return  Math.floor(Math.random()*100000);
}

module.exports = otpGenerator;