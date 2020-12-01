let myHeaders = new Headers();
myHeaders.append("Authorization", localStorage.getItem('token'));
// myHeaders.append("Authorization", "Token c0314a90397e0c966697df845de91aa47b7a9325");


export default myHeaders;