'use strict';

angular.module('classy', ['ui.bootstrap', 'classy.system']);
angular.module('classy.public', ['ui.bootstrap', 'classy', 'classy.system']);
angular.module('classy.admin', ['classy', 'classy.system']);;


angular.module('classy.system', []);
