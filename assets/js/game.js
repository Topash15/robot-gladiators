// function to generate a random numeric value
var randomNumber = function (min, max) {
    var value = Math.floor(Math.random()* (max - min + 1)+ min);

    return value;
}

//player information
var playerInfo = {
    name: prompt("What is your robot's name?"),
    health : 100,
    attack : 10,
    money : 10,
    reset: function () {
        this.health = 100;
        this.money = 10;
        this.attack = 10;
    },
    //**shop functions**
    //refill health
    refillHealth: function () {
        if(this.money >=7){
            alert("Refilling player's health by 20 for 7 dollars.")
            this.health += 20;
            this.money -= 7;
        }
        else {
            alert("You don't have enough money!");
        }
    },
    //upgrade attack
    upgradeAttack: function () {
        if (this.money >= 7){
            alert("Upgrading player's attack by 6 for 7 dollars.");
            this.attack += 6;
            this.money -=7;
        }
        else {
            alert("You don't have enough money!")
        }
    }
};

// You can also log multiple values at once like this
// console.log(playerInfo.name, playerInfo.attack, playerInfo.health);

//enemy information
var enemyInfo = [
    {
        name : "Roborto",
        attack : randomNumber(10, 14)
    },
    {
        name : "Amy Android",
        attack : randomNumber(10, 14)
    },
    {
        name : "Robo Trumple",
        attack : randomNumber(10 ,14)
    }
];

//fight function
var fight = function(enemy){
    console.log(enemy)
    //repeat and execute as long as the enemy-robot is alive
    while (enemy.health > 0 && playerInfo.health > 0) {

        //player prompt to fight or skip battle
        var promptFight = window.prompt("Would you like to FIGHT or SKIP this battle? Enter 'FIGHT' or 'SKIP' to choose.");

        //if player choses to fight
        if (promptFight === "fight" || promptFight === "FIGHT"){
            //generate random damage based on player's attack power
            var damage = randomNumber(playerInfo.attack - 3, playerInfo.attack);

            //Subtract the value of 'playerInfo.attack' from the value of 'enemy.health' and use that result to update the value in the 'enemy.health' variable
            enemy.health = Math.max(0, enemy.health - damage);
            //Log a resulting message to the console so we know that it worked
            console.log(
                playerInfo.name + " attacked " + enemy.name + ". " + enemy.name + " now has " + enemy.health + " health remaining."
                );
            // check enemy health
            if (enemy.health <= 0){
                window.alert(enemy.name + " has died!");
                //end loop since enemy is dead
                break;
            }
            //if enemy still has health
            else{
                window.alert(enemy.name + " still has " + enemy.health + " health left.");
            }
            //generate random damage value based on enemy's attack power
            var damage = randomNumber(enemy.attack - 3, enemy.attack);
            //Subtract the value of 'enemy.attack' from the value of 'playerInfo.health' and use that result to update the value in the 'playerInfo.health' variable
            playerInfo.health = Math.max(0, playerInfo.health- enemy.attack);
            //Log a resulting message to the console so we know that it worked
            console.log(
                enemy.name + " attacked " + playerInfo.name + ". " + playerInfo.name + " now has " + playerInfo.health + " health remaining."
                );
            //check player health
            if (playerInfo.health <= 0){
                window.alert(playerInfo.name + " has died!");
                //end loop since player is dead
                break;
            }
            //if player still has health
            else {
                window.alert(playerInfo.name + " still has " + playerInfo.health + " health left.")
            }
        }
        //if player choses to skip
        else if(promptFight === "skip" || promptFight === "SKIP"){
            //confirm player would like to skip
            var confirmSkip = window.confirm("Are you sure that you'd like to quit?")

            //if yes(true), leave fight
            if (confirmSkip && playerInfo.attack >= 10){
                window.alert(playerInfo.name + " has chosen to skip the fight. Goodbye!");

                //subtract money for skipping
                playerInfo.attack =Math.max(0, playerInfo.attack - 10);
                console.log("playerInfo.attack", playerInfo.attack);
                break;
            } else if (confirmSkip && playerInfo.attack < 10){
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
    if (playerInfo.health > 0){
        alert("Great job, you've survived the game! You now have a score of " + playerInfo.attack + ".");
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
        //refills health
        case "REFILL": //new case
        case "refill":
            playerInfo.refillHealth();
            break;
        //upgrades attack
        case "UPGRADE": //new case
        case "upgrade":
            playerInfo.upgradeAttack();
            break;
        //leaves shop
        case "LEAVE": //new case
        case "leave" :
            alert("Leaving the store.");

            //do nothing and end function
            break;
        //loops shop() if invalid choice is selected
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
    playerInfo.reset();

    //loops through enemy names to fight each enemy
    for (var i = 0; i< enemyInfo.length; i++){
        if (playerInfo.health > 0) {
            //tell player what round they are in
            alert("Welcome to Robot Gladiators! Round " + ( i + 1 ));
        }
        else{
            alert("You have lost your robot in battle! Game Over!");
            break;
        }
        var pickedEnemyObj = enemyInfo[i];
        //set enemy.health back to 50
        pickedEnemyObj.health = randomNumber(40, 60);
        //call fight function with enemy robot
        fight(pickedEnemyObj);

        //if player is still alive and we're not at the last enemy in the array
        if (playerInfo.health > 0 && i < enemyInfo.length - 1){
            shop();
        }
    }

    //after the loop ends, player is either out of health or enemies to fight, so run the endGame function
    endGame();
}

//start game when the page loads
startGame();