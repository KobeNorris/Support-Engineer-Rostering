function login()
{
	//alert("Login button pressed");
	
	var enteredPassword = document.getElementById("pwd").value;
	var enteredUsername = document.getElementById("username").value; 
		
	document.write("Username: " + document.getElementById("username").value + "<br/> Password: " + enteredPassword);

	var expectedUsername = "username";
	var expectedPassword = "password";
	
	if ( (enteredPassword === expectedPassword) && (enteredUsername === expectedUsername) )
	{
		document.write(" <br/> Logged In!");
	}
	else
	{
		document.write(" <br/> NOT Logged In!");
	}

}
