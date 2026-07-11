const {
    getTokenPrice
}
=
require("./market/tokenPrice");



async function test(){


    console.log(
        await getTokenPrice("BTC")
    );


    console.log(
        await getTokenPrice("ETH")
    );


}


test();