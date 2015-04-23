

angular.module('portfolioManager.services', ['portfolio.manager.service', 'aex.utils']).factory('portService','utilService', function() {
   'use strict';
    var service = {};

    var companies1 = [
            'Hospira, Inc.',
            'Aurobindo Pharma Ltd.',
            'Endo International plc'
        ];

    var companies2 = [
            'Pfizer, Inc.',
            'Hikma Pharmaceuticals',
            'Apotex, Inc.'
        ];

    var companies3 = [
            'Valeant Pharmaceuticals',
            'Akorn, Inc.',
            'Sanofi SA'
        ];

    var companies4 = [
            'Bayer AG',
            'Strides Arcolab Ltd.',
            'AbbVie Inc.'
        ];

    var companies5 = [
            'Lupid Ltd.',
            'Cipla Ltd.',
            'Emcure Pharmaceuticals'
        ];

    var drugs1 = [
            'Effexor',
            'Lexapro',
            'Paxil'
        ];

    var drugs2 = [
            'Avonex',
            'Remicade',
            'Chantix'
        ];

    var drugs3 = [
            'Mirena',
            'Vioxx',
            'Avandia'
        ];

    var drugs4 = [
            'Aleve',
            'Dianeal',
            'Byetta'
        ];

    var drugs5 = [
            'Paxil',
            'Nexium',
            'Rebif'
        ];

    return {
        companies: function(portId) {
            if (portId === '1') {
                return companies1;
            }
            else if (portId === '2') {
                return companies2;
            }
            else if (portId === '3') {
                return companies3;
            }
            else if (portId === '4') {
                return companies4;
            }
            else if (portId === '5') {
                return companies5;
            } else {
                return [];
            }
        },
        drugs: function(portId) {

            if (portId === '1') {
                return drugs1;
            }
            else if (portId === '2') {
                return drugs2;
            }
            else if (portId === '3') {
                return drugs3;
            }
            else if (portId === '4') {
                return drugs4;
            }
            else if (portId === '5') {
                return drugs5;
            } else {
                return [];
            }
        }
    };
});
