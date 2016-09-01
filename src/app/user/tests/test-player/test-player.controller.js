
(function(){
    'use strict';

    angular.module('app')
        .controller('TestPlayerController', TestPlayerController);

    TestPlayerController.$inject = ['loginService', 'testDetailsService', '$stateParams', 'questionsService', 'testService', 'scheduleService', 'testPlayerService', 'adminService', '$uibModal', '$interval'];

    function TestPlayerController (loginService, testDetailsService, $stateParams, questionsService, testService, scheduleService, testPlayerService, adminService, $uibModal, $interval) {

        var self = this;

        //variables
        self.user_id = 0;
        self.questionId = $stateParams.currentQuestionId;
        self.groupId = $stateParams.groupId;
        self.test_id = $stateParams.currentTestId;
        self.listOfQuestions = [];
        self.checked;
        self.currentTest = JSON.parse(localStorage.currentTest);
        self.timerValue;
        self.testDuration = 1800000;          // TODO should be someservisemethod
        self.getTimerValue;

        //methods


        activate();

        function activate() {
            console.log(self.currentTest);
            console.log(self.listOfQuestions);
            isLogged()
                .then(getTestDetailsByTest);
            getTimerValue();
        }

         function getTimerValue () {
             $interval(function () {
                 return self.timerValue = self.testDuration -= 1000;
             }, 1000);
         }

        function isLogged() {
            return loginService.isLogged().then(function(response) {
                self.user_id = response.data.id;
            });
        }

        function getTestDetailsByTest() {
            testDetailsService.getTestDetailsByTest(self.test_id).then(getTestDetailsByTestComplete)
        }
        function getTestDetailsByTestComplete(response) {
                angular.forEach(response.data, function(testDetail) {
                    getQuestionsByLevelRand(testDetail.level, testDetail.tasks);
                });
        }

        function getQuestionsByLevelRand(levelOfQuestion, numberOfQuestions) {
            questionsService.getQuestionsByLevelRand(self.test_id, levelOfQuestion, numberOfQuestions)
                .then(function(response) {
                    angular.forEach(response.data, function(question) {
                        self.listOfQuestions.push(question);
                    });

                    angular.forEach(self.listOfQuestions, function(question, index) {
                        question.index = index + 1;
                    });
                });
        }

    }
}());