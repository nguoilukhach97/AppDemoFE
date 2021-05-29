const app = new Vue ({
    el: '#main',
   
    data: {
        result: [],
        resultProduct : [],
        resultCustomer : [],
        responseAvailable: false,
        totalRow : 0,
        productId:"",
        customerId:"",
        quantity:"",
        orderDate:"",
    },
    methods: {
        fetchAPIData(index) { 
            this.responseAvailable = false;
            fetch(`https://localhost:44307/api/Product?isASC=true&pageIndex=${index || 1}&pageSize=20`, {
                "method": "GET",
                "headers": {
                    "Accept": "application/json, text/plain",
                    "Accept-Encoding": "gzip, deflate", 
                    "Accept-Language": "en-US,en;q=0.9,vi;q=0.8",
                    "Access-Control-Allow-Origin": "*",
                    "Authorization": "bearer " + localStorage.getItem("token"),
                    "Connection":"keep-alive",
                    "Sec-Fetch-Dest": "empty",
                    "Sec-Fetch-Mode": "cors",
                    "Sec-Fetch-Site": "same-site",
                    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.212 Safari/537.36"
                }
            })
            .then(response => { 
                if(response.ok){
                    return response.json()    
                } else{
                    if(response.status == 401){
                        window.location.href = "login.html";
                    }
                    alert("Server returned " + response.status + " : " + response.statusText);
                }                
            })
            .then(response => {
                this.result = response;
                this.totalRow = Math.ceil(response.resultObj.totalRow/response.resultObj.pageSize);
                this.responseAvailable = true;
            })
            .catch(err => {
                console.log(err);
            });
        },
        createData(){
           
            const order = {
                productId: this.productId,
                customerId: this.customerId,
                orderDate : this.orderDate,
                quantity : this.quantity
            };
            this.responseAvailable = false;
            fetch("https://localhost:44307/api/Order", {
                "method": "POST",
                "headers": {
                    "Access-Control-Allow-Origin": "*",
                    "Content-Length" : "72",
                    "Authorization" : "bearer " + localStorage.getItem("token"),
                    "Content-Type" : "application/json"
                },
                "body" : JSON.stringify(order)
                
            })
            .then(response => { 
                if(response.ok){
                    return response.json();
                } else{
                    if(response.status == 500){
                        alert("Thêm mới thất bại , kiểm tra lại dữ liệu");
                    }
                    alert("Server returned " + response.status + " : " + response.statusText);
                }               
            })
            .then(data => {
                if(data.isSucceed == false){
                    alert(data.message);
                }
                else{
                    alert("thanh cong");
                    this.fetchAPIData();
                }
            })
            .catch(err => {
                console.log(err);
            });
        },
        getProduct(){
            fetch('https://localhost:44307/api/Product/get-all', {
                "method": "GET",
                "headers": {
                    "Accept": "application/json, text/plain",
                    "Accept-Encoding": "gzip, deflate", 
                    "Accept-Language": "en-US,en;q=0.9,vi;q=0.8",
                    "Access-Control-Allow-Origin": "*",
                    "Authorization": "bearer " + localStorage.getItem("token"),
                    "Connection":"keep-alive",
                    "Sec-Fetch-Dest": "empty",
                    "Sec-Fetch-Mode": "cors",
                    "Sec-Fetch-Site": "same-site",
                    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.212 Safari/537.36"
                }
            })
            .then(response => { 
                if(response.ok){
                    return response.json()
                } else{
                    if(response.status == 401){
                        window.location.href = "login.html";
                    }
                    alert("Server returned " + response.status + " : " + response.statusText);
                }                
            })
            .then(response => {
                this.resultProduct = response.resultObj;
            })
            .catch(err => {
                console.log(err);
            });
        },
        getCustomer(){
            fetch('https://localhost:44307/api/Customer/get-all', {
                "method": "GET",
                "headers": {
                    "Accept": "application/json, text/plain",
                    "Accept-Encoding": "gzip, deflate", 
                    "Accept-Language": "en-US,en;q=0.9,vi;q=0.8",
                    "Access-Control-Allow-Origin": "*",
                    "Authorization": "bearer " + localStorage.getItem("token"),
                    "Connection":"keep-alive",
                    "Sec-Fetch-Dest": "empty",
                    "Sec-Fetch-Mode": "cors",
                    "Sec-Fetch-Site": "same-site",
                    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.212 Safari/537.36"
                }
            })
            .then(response => { 
                if(response.ok){
                    return response.json()
                } else{
                    if(response.status == 401){
                        window.location.href = "login.html";
                    }
                }                
            })
            .then(response => {
                this.resultCustomer = response.resultObj;
            })
            .catch(err => {
                console.log(err);
            });
        }
    },
    mounted() {
        this.fetchAPIData();
        this.getProduct();
        this.getCustomer();
    }

})