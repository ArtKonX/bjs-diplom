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
            objMoneyManager.setMessage(response.success, "Деньги были успешно добавлены!");
        } else {
            objMoneyManager.setMessage(response.success, response.error);
        }
    })
}

objMoneyManager.conversionMoneyCallback = data => {
    ApiConnector.convertMoney(data, response => {
        if (response.success) {
            ProfileWidget.showProfile(response.data);
            objMoneyManager.setMessage(response.success, "Валюта была успешно конвертирована!");
        } else {
            objMoneyManager.setMessage(response.success, response.error);
        }
    })
}

objMoneyManager.sendMoneyCallback = data => {
    ApiConnector.transferMoney(data, response => {
        if (response.success) {
            ProfileWidget.showProfile(response.data);
            objMoneyManager.setMessage(response.success, "Валюта была успешно переведена!");
        } else {
            objMoneyManager.setMessage(response.success, response.error);
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
            objFavoritesWidget.setMessage(response.success, "Добавление в список избранного прошло успешно!");
        } else {
            objFavoritesWidget.setMessage(response.success, response.error);
        }
    })
}

objFavoritesWidget.removeUserCallback = (data) => {
    ApiConnector.removeUserFromFavorites(data, response => {
        if (response.success) {
            objFavoritesWidget.clearTable();
            objFavoritesWidget.fillTable(response.data);
            objMoneyManager.updateUsersList(response.data);
            objFavoritesWidget.setMessage(response.success, "Удаление пользователя из избранного прошло успешно!");
        } else {
            objFavoritesWidget.setMessage(response.success, response.error);
        }
    })
}
