function editProfile() {
  document.querySelector('#container').style.display = 'none'
  document.querySelector('#container-edit').style.display = 'block'

  const name = document.querySelector('#name').textContent
  document.querySelector('#input-name').value = name

  const email = document.querySelector('#email').textContent
  document.querySelector('#input-email').value = email

  const interests = document.querySelector('#interests').textContent
  document.querySelector('#input-interests').value = interests
  }

async function saveProfile() {
  const userObj = {
      name: document.querySelector("#input-name").value,
      email: document.querySelector("#input-email").value,
      interests: document.querySelector("#input-interests").value
  }

  const response = await fetch('http://localhost:3000/update-profile',
    {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userObj)
    })
  const res = await response.json()
  console.log(res)
  document.querySelector('#name').textContent = res.name
  document.querySelector('#email').textContent = res.email
  document.querySelector('#interests').textContent = res.interests
  document.querySelector('#container').style.display = 'block'
  document.querySelector('#container-edit').style.display = 'none'
}