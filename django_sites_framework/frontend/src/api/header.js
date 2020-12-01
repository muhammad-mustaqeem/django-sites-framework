let myHeaders = new Headers();
myHeaders.append("Authorization", localStorage.getItem('token'));

export default myHeaders;