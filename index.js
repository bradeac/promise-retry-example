const fetch = require('node-fetch')
const promiseRetry = require('promise-retry')

async function doSomething() {
	return new Promise((resolve, reject) =>	{
		return fetch('ENTER_URL_HERE')
		.then(response => response.json())
		.then(json => {
			if (json.error) {
				reject(json.error)
			}
	
			resolve(json)
		})
	})
}

function promiseWithRetry() {
	const options = {
		retries: 5,
		factor: 3,
	}

	promiseRetry(options, (retry) => {
		return doSomething().catch((error) => {
			if (error.code === 429) {
				console.log('throttling')

				retry(error)
			}
		})
	})
	.then(response => {
		console.log('the response was returned')

		return response
	})
	.catch(error => console.log('return 500 here', error))
}


// // uncomment in order to quickly test
// function run() {
// 	for(let i = 0; i <= 100; i++) {
// 		promiseWithRetry()
// 	}
// }

// run()