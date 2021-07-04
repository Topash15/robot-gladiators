//Player variables
var playerName = window.prompt("What is your robot's name?");
var playerHealth = 100;
var playerAttack = 10;
var playerMoney = 10;

// You can also log multiple values at once like this
// console.log(playerName, playerAttack, playerHealth);

//Enemy variables
var enemyNames = ["Roborto", "Amy Android", "Robo Trumble"];
var enemyHealth = 50;
var enemyAttack = 12;

var fight = function(enemyName){
    //repeat and execute as long as the enemy-robot is alive
    while (enemyHealth > 0 && playerHealth > 0) {

        //player prompt to fight or skip battle
        var promptFight = window.prompt("Would you like to FIGHT or SKIP this battle? Enter 'FIGHT' or 'SKIP' to choose.");

        //if player choses to fight
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
                //end loop since enemy is dead
                break;
            }
            //if enemy still has health
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
                //end loop since player is dead
                break;
            }
            //if player still has health
            else {
                window.alert(playerName + " still has " + playerHealth + " health left.")
            }
        }
        //if player choses to skip
        else if(promptFight === "skip" || promptFight === "SKIP"){
            //confirm player would like to skip
            var confirmSkip = window.confirm("Are you sure that you'd like to quit?")

            //if yes(true), leave fight
            if (confirmSkip && playerMoney >= 10){
                window.alert(playerName + " has chosen to skip the fight. Goodbye!");

                //subtract money for skipping
                playerMoney -= 10;
                console.log("playerMoney", playerMoney);
                break;
            } else if (confirmSkip && playerMoney < 10){
                alert("You do not have enough money to skip. You must fight!");
                fight();
            } else{
                //if no, ask question by running fight() again
                fight();
            }
        } else {
            window.alert("You need to choose a valid option. Try again!");
        };
    };
};

//function to end the entire game
var endGame = function(){
    //if player is still alive, player wins!
    if (playerHealth > 0){
        alert("Great job, you've survived the game! You now have a score of " + playerMoney + ".");
    }
    else{
        alert("You've lost your robot in battle.")
    }

    //ask player if they'd like to play again
    var playAgainConfirm = confirm("Would you like to play again?");

    if (playAgainConfirm){
        //restart the game
        startGame();
    }else{
        alert("Thank you for playing Robot Gladiators! Come back soon!");
    }
};


//shop function
var shop = function () {
    //ask player what they'd like to do
    var shopOptionPrompt = prompt("Would you like to REFILL your health, UPGRADE your attack, or LEAVE the store? Please enter one: 'REFILL', 'UPGRADE', or 'LEAVE' to make a choice.");

    //shop options and outcomes
    switch (shopOptionPrompt) {
        case "REFILL": //new case
        case "refill":
            if (playerMoney > 7){
                alert("Refilling player's health by 20 for 7 dollars.");

                //increase health and decrease money
                playerHealth += 20;
                playerMoney -= 7;
            } 
            else {
                alert("You don't have enough money!");
            }

            break;
        case "UPGRADE": //new case
        case "upgrade":
            if (playerMoney > 7){
                alert("Upgrading player's attack by 6 for 7 dollars");

                //increase attack and decrease money
                playerAttack += 6;
                playerMoney -= 7;
            }
            else{
                alert("You don't have enough money!");
            }

            break;
        case "LEAVE": //new case
        case "leave" :
            alert("Leaving the store.");

            //do nothing and end function
            break;
        default:
            alert("You did not pick a valid option. Try again.");

            //call shop again since no valid choice was made
            shop();
            break;
    }
}

//function to start a new game
var startGame = function(){

    //reset player stats
    playerHealth = 100;
    playerAttack = 10;
    playerMoney = 10;

    //loops through enemy names to fight each enemy
    for (var i = 0; i< enemyNames.length; i++){
        if (playerHealth > 0) {
            //tell player what round they are in
            alert("Welcome to Robot Gladiators! Round " + ( i + 1 ));
        }
        else{
            alert("You have lost your robot in battle! Game Over!");
            break;
        }
        var pickedEnemyName = enemyNames[i];
        //set enemyHealth back to 50
        enemyHealth = 50;
        //call fight function with enemy robot
        fight(pickedEnemyName);

        //if player is still alive and we're not at the last enemy in the array
        if (playerHealth > 0 && i < enemyNames.length - 1){
            shop();
        }
    }

    //after the loop ends, player is either out of health or enemies to fight, so run the endGame function
    endGame();
}

//start game when the page loads
startGame();

