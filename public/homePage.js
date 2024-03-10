"use strict"

const objLogButton = new LogoutButton();
const objRatesBoard = new RatesBoard();
const objMoneyManager = new MoneyManager();
const objFavoritesWidget = new FavoritesWidget();

objLogButton.action = () => { ApiConnector.logout((response) => response.success && location.reload()) };

ApiConnector.current((response) => response.success && ProfileWidget.showProfile(response.data));

objRatesBoard.getExchangeRate = () => {
    ApiConnector.getStocks(response => {
        if (response.success) {
            objRatesBoard.clearTable();
            objRatesBoard.fillTable(response.data);
        }
    })
}

objRatesBoard.getExchangeRate();

setInterval(objRatesBoard.getExchangeRate, 60000);

objMoneyManager.addMoneyCallback = data => {
    ApiConnector.addMoney(data, response => {
        if (response.success) {
            ProfileWidget.showProfile(response.data);
            objMoneyManager.setMessage(response.success, "Money has been successfully added!");
        } else {
            objMoneyManager.setMessage(response.success, "No money added!");
        }
    })
}

objMoneyManager.conversionMoneyCallback = data => {
    ApiConnector.convertMoney(data, response => {
        if (response.success) {
            ProfileWidget.showProfile(response.data);
            objMoneyManager.setMessage(response.success, "The currency has been converted successfully!");
        } else {
            objMoneyManager.setMessage(response.success, "The currency has not been converted!");
        }
    })
}

objMoneyManager.sendMoneyCallback = data => {
    ApiConnector.transferMoney(data, response => {
        if (response.success) {
            ProfileWidget.showProfile(response.data);
            objMoneyManager.setMessage(response.success, "The currency has been transferred successfully!");
        } else {
            objMoneyManager.setMessage(response.success, "The currency has not been transferred!");
        }
    })
}

(function getInitialList() {
    ApiConnector.getFavorites((response) => {
        if (response.success) {
            objFavoritesWidget.clearTable();
            objFavoritesWidget.fillTable(response.data);
            objMoneyManager.updateUsersList(response.data);
        }
    })
})();

objFavoritesWidget.addUserCallback = (data) => {
    ApiConnector.addUserToFavorites(data, response => {
        if (response.success) {
            objFavoritesWidget.clearTable();
            objFavoritesWidget.fillTable(response.data);
            objMoneyManager.updateUsersList(response.data);
            objFavoritesWidget.setMessage(response.success, "The addition to the favorites list was successful!");
        } else {
            objFavoritesWidget.setMessage(response.success, "The addition to the favorites list did not pass!");
        }
    })
}

objFavoritesWidget.removeUserCallback = (data) => {
    ApiConnector.removeUserFromFavorites(data, response => {
        if (response.success) {
            objFavoritesWidget.clearTable();
            objFavoritesWidget.fillTable(response.data);
            objMoneyManager.updateUsersList(response.data);
            objFavoritesWidget.setMessage(response.success, "Deleting a user from favorites was successful!");
        } else {
            objFavoritesWidget.setMessage(response.success, "Deleting a user from favorites has not passed!");
        }
    })
}
