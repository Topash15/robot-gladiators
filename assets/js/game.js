var playerName = window.prompt("What is your robot's name?");
var playerHealth = 100;
var playerAttack = 10;
var playerMoney = 10;

// You can also log multiple values at once like this
console.log(playerName, playerAttack, playerHealth);

var enemyName = "Roborto";
var enemyHealth = 50;
var enemyAttack = 12;

var fight = function() {
    //alerts players that they are starting the round
    window.alert("Welcome to Robot Gladiators!");
    //player prompt to fight or skip battle
    var promptFight = window.prompt("Would you like to FIGHT or SKIP this battle? Enter 'FIGHT' or 'SKIP' to choose.");
    //determines outcome based on player's prompt
    if (promptFight === "fight" || promptFight === "FIGHT"){
        //Subtract the value of 'playerAttack' from the value of 'enemyHealth' and use that result to update the value in the 'enemyHealth' variable
        enemyHealth -= playerAttack;
        //Log a resulting message to the console so we know that it worked
        console.log(
            playerName + " attacked " + enemyName + ". " + enemyName + " now has " + enemyHealth + " health remaining."
            );
        // check enemy health
        if (enemyHealth <= 0){
            window.alert(enemyName + " has died!");
        }
        else{
            window.alert(enemyName + " still has " + enemyHealth + " health left.");
        }
        //Subtract the value of 'enemyAttack' from the value of 'playerHealth' and use that result to update the value in the 'playerHealth' variable
        playerHealth -= enemyAttack;
        //Log a resulting message to the console so we know that it worked
        console.log(
            enemyName + " attacked " + playerName + ". " + playerName + " now has " + playerHealth + " health remaining."
            );
        //check player health
        if (playerHealth <= 0){
            window.alert(playerName + " has died!");
        }
        else {
            window.alert(playerName + " still has " + playerHealth + " health left.")
        }
    }
    //if player choses to skip
    else if(promptFight === "skip" || promptFight === "SKIP"){
        //confirm player would like to skip
        var confirmSkip = window.confirm("Are you sure that you'd like to quit?")

        //if yes(true), leave fight
        if (confirmSkip){
            window.alert(playerName + " has chosen to skip the fight. Goodbye!");
            //subtract money for skipping
            playerMoney -= 2
        }
        else {
            //if no, ask question by running fight() again
            fight();
        }
    } else {
        window.alert("You need to choose a valid option. Try again!");
    }
};

fight();