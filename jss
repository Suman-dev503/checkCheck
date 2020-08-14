 var firebaseConfig = {
    apiKey: "AIzaSyD976fpllw0jQ8HSyGaVpOz_9rexMqw89A",
    authDomain: "chat-app-76ec0.firebaseapp.com",
    databaseURL: "https://chat-app-76ec0.firebaseio.com",
    projectId: "chat-app-76ec0",
    storageBucket: "chat-app-76ec0.appspot.com",
    messagingSenderId: "712780025583",
    appId: "1:712780025583:web:7c54a2943cc9bf1f46d51a",
    measurementId: "G-DQVMKYNCJG"
  };
firebase.initializeApp(firebaseConfig);
var db = firebase.firestore();
if (!localStorage.getItem('name')) {
	name = prompt('What is your name?')
	localStorage.setItem('name', name)
} else {
	name = localStorage.getItem('name')
}
document.querySelector('#name').innerText = name
document.querySelector('#change-name').addEventListener('click', () => {
	name = prompt('What is your name?')
	localStorage.setItem('name', name)
	document.querySelector('#name').innerText = name
})
db.collection('messages')
	.add({
		name: 'John Doe',
		message: 'Hello world!' 
	})
	.then(function (docRef) {
		console.log(`Document written with ID: ${docRef.id}`);
	})
	.catch(function (error) {
		console.error(`Error adding document: ${error}`);
	});

})
document.querySelector('#message-form').addEventListener('submit', e => {
	e.preventDefault();
	let message = document.querySelector('#message-input').value 
	db.collection('messages')
	.add({
		name: name,
		message: message
	})
	.then((docRef) => {
		console.log(`Document written with ID: ${docRef.id}`);
		document.querySelector('#message-form').reset()
	})
	.catch((error) => {
		console.error(`Error adding document: ${error}`);
	});
})
db.collection('messages')
.onSnapshot(snapshot => {
	document.querySelector('#messages').innerHTML = ''
	snapshot.forEach(doc => {
		let message = document.createElement('div')
		message.innerHTML = `
		<p class="name">${doc.data().name}</p>
		<p>${doc.data().message}</p>
		`
		document.querySelector('#messages').prepend(message)
	})
})
