		const API = 'https://test-users-api.herokuapp.com/';
		const container = document.querySelector('.users');
		const btnloadUsers = document.querySelector('.loadusers');
		const btnCreateUser = document.querySelector('#createuser');

		const getUsers = () => {
			return fetch(API + 'users', {
				method: 'GET'
			}).then(response => {
				return response.json();
			}).catch(error => {
				console.log(error);
				return [];
			})
		};

		const deleteUser = async (userId, userItem) => {
			await fetch(API + 'users/' + userId, {
					method: 'DELETE'
				})
				.then(() => {
					userItem.remove();
				}).catch(err => {
					console.log(err);
				})
		};

		const renderUsers = (users) => {
			users.data.forEach(item => {
				const userElement = document.createElement('div');
				userElement.classList.add('users-div');
				userElement.innerHTML = `
				<p>${item.name + ' ' +	item.age}</p>
				`;
				const deleteUserBtn = document.createElement('button');
				deleteUserBtn.classList.add('user-delete');
				deleteUserBtn.textContent = 'X';
				deleteUserBtn.addEventListener('click', () => {
					deleteUser(item.id, userElement);
				});

				userElement.append(deleteUserBtn);
				container.append(userElement);
			})
		};

		const loadUsers = async () => {
			const users = await getUsers();
			renderUsers(users);
		};

		const createUser = () => {
			const name = document.querySelector('#name').value;
			const age = document.querySelector('#age').value;
			console.log(name, age);

			fetch(API + 'users/', {
				method: 'POST',
				body: JSON.stringify({
					name: name,
					age: age
				})
			}).then(() => {
				renderUsers({
					data: [{
						name: name,
						age: age
					}]
				});
			}).catch(error => {
				console.log(error);
			})
		};

		btnloadUsers.addEventListener('click', loadUsers);
		btnCreateUser.addEventListener('click', createUser);