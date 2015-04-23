// to setup, need to install these from shell:
// npm install benchmark; npm install lodash;

var Benchmark = require('benchmark');
var _ = require('lodash');
var Crossfilter = require('crossfilter');
var D3 = require('d3');

var Data = require('./druggroup-events.json');

// build test suite
Benchmark.options.minSamples = 30;
var suite = new Benchmark.Suite;
suite
    .add('lodashGroup', function () {
        var d = _.chain(Data)
            .filter(function(d){
                return d.metric_value > d3.mean(_.pluck(Data,'metric_value'));
            }).value();
        return d;
    })
    .add('d3GroupBy', function () {

            var adverseData = d3.nest()
                .key(function (d) {
                    return d.termCode_label;
                }).sortKeys(d3.ascending)
                .key(function (d) {
                    return d.aedrug_label;
                }).sortKeys(d3.ascending)
//            .sortValues(function(a,b){return d3.ascending(a.aedrug_label, b.aedrug_label);})
                .rollup(function (leaves) {
                    return {
                        "aedrug_id": leaves[0].aedrug_id, "metric_value": d3.mean(leaves, function (d) {
                            return parseFloat(d.metric_value);
                        })
                    }
                })
                .entries(Data)
                .map(function (d) {
                    var event = {};
                    event['event_name'] = d.key;
                    d.values.map(function (dd) {
                        event[dd.key] = dd.values.metric_value;
                    });
                    return event;
                });

            return _.sortBy(adverseData, 'metric_value');

    })

    .on('cycle', function (event) {
        console.log(String(event.target));
    })
    .on('complete', function () {
        console.log('Fastest is ' + this.filter('fastest').pluck('name'));
    })
    .run({'async': true});
