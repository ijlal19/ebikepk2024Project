import Gconfig from "globalconfig";

function getShopMainCategory() {
    return fetch(Gconfig.ebikeApi + `shop/get-main-catagory-data`, {
        method: 'GET',
        headers: { "Content-Type": "application/json" },
    })
        .then(response => response.json())
        .then(data => {
            return data
        })
        .catch((err) => {
            console.log(err)
        })
}

function getProductCompany() {
    return fetch(Gconfig.ebikeApi + `shop/get-product-company-data`, {
        method: 'GET',
        headers: { "Content-Type": "application/json" },
    })
        .then(response => response.json())
        .then(data => {
            return data
        })
        .catch((err) => {
            console.log(err)
        })
}


function getShopCategory(data: any) {
    return fetch(Gconfig.ebikeApi + `shop/product/get-product-by-catagory/`, {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    })
        .then(response => response.json())
        .then(data => {
            return data
        })
        .catch((err) => {
            console.log('err', err)
        })
}

export {
    getShopMainCategory,
    getShopCategory,
    getProductCompany
}




// getCompanyDataByFilter(event){

//     const { productData } = this.state;
   
//     if(event.target.checked){

//         this.state.filter.company_filter.push(event.target.value);
//         // console.log('event' , event.target.value)

//     fetch('https://ebikepk-server-nodejs.herokuapp.com/api/shop/product/get-product-by-Filter', {
//         method: 'POST',
//         headers: {
//             Accept: 'application/json',
//             'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//         data:    this.state.filter,
//      })
//         }).then((response) => {
//             return response.json()
//         }).then((myjson) => {
           
//             // console.log('json' , myjson)
            
//             if(myjson.length){

//             while(productData.length > 0) {
//                 productData.pop();
//             }

//             this.setState({ productData : myjson })

//            }

//           }).catch((err) => {
//             alert(err)
//           })
//     }
//  }





// {this.state.companyData.length > 1 &&
//     this.state.companyData.filter(this.onSearch.bind(this)).slice(0, 10).map((item, ind) => {
//        return (
//          <div key={ind} className="custom-control custom-checkbox ml-2" style={{ fontSize: '13px' }}  
//          val={item.id}
//          onClick={value => {
//              this.getCompanyDataByFilter(value);
//          }} >
          
//            <input
//                type="checkbox"
//                className="custom-control-input"
//                value={item.id}
//                id={customCheck${ind}}
//                // onChange={value => {
//                //     this.getCompanyDataByFilter(value);
//                // }}
//            />
//            {/* <div className="mt-1">{item.name}</div> */}
//            <label className="custom-control-label mt-1"   for={customCheck${ind}} style={{ fontSize:'11px' , }}>
//              {item.name}
//            </label>
//        </div>
//        );
//              })}