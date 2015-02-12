// Volunteer class constructor
var Volunteer = function(firstName, lastName, number, email, ages, lead, bckcheck){
    this.firstName = firstName;
    this.lastName = lastName;
    this.number = number;
    this.email = email;
    this.ages = ages;
    this.lead = lead;
    this.bckcheck = bckcheck;
    this.fullName = this.firstName + ' ' + this.lastName;
    if(!(this instanceof Sub) && firstName !== undefined){
        Volunteer.volunteers.push(this);
    }
};
// All volunteers
Volunteer.volunteers = [];

// Sub-class for substitutes
var Sub = function(firstName, lastName, number, email, ages, lead, bckcheck){
    Volunteer.call(this, firstName, lastName, number, email, ages, lead, bckcheck);
    this.sub = true;
    Sub.volunteers.push(this);
};
Sub.prototype = new Volunteer();
Sub.prototype.constructor = Sub;

// All substitutes
Sub.volunteers = [];

var willTeach = function(array, ageGroup) {
    var matches =  _.filter(array, function(val) {
        return _.contains(val.ages, ageGroup);
    });
    return _.map(matches, function(volunteer){
        return volunteer.fullName;
    });
};

var sortVolunteers = function(array){
    return array.reduce(function(obj, vol){
        vol.ages.forEach(function(age){
        if(age in obj){ 
            obj[age].push(vol);
        }
        else{
            obj[age] = [vol];
        }
            });
        return obj;
    }, {});
};

var populateVolunteersNewSchedule = function(){
    return  _.map(sortVolunteers(Volunteer.volunteers), function(val, key){
        var $el = $('.volunteer-checkboxes').first().clone();
        $el.find('.age-range').text(key);
        _.map(val, function(val,ind){
            var list = $el.find('.vol-list-item').first().clone();
            list.removeClass('hiding');
            list.find('.name').text(val.fullName);
            return $el.find('ul').append(list);
        });
        return $el;
    });
};

var populateAllVolunteers = function(){
    return _.map(Volunteer.volunteers, function(val){
        var $el = $('.table-volunteer').first().clone();
        $el.removeClass('hiding');
        $el.find('.table-name').text(val.fullName);
        $el.find('.table-phone').text(val.number);
        $el.find('.table-email').children('a').text(val.email);
        $el.find('.table-lead').text(val.lead);
        $el.find('.table-bckcheck').text(val.bckcheck);
        $el.find('.table-ages').text(val.ages);
        return $el;
    });

};

// Create Demo Volunteer List
// Infants, 12-18 month, 18-24month, 2-3yrs, 3-4yrs, 4-5yrs
var matilda = new Volunteer('Matilda', 'Rich', '123-456-7890', 'Matilda@email.com', ['infants'], 'no', 'yes');
var court = new Volunteer('Court', 'Rich', '123-456-7890', 'court@email.com', ['infants'], 'yes', 'yes');
var leia = new Volunteer('Leia', 'Organa', '123-456-7890', 'Leia@email.com', ['12-18month'], 'yes', 'yes');
var maggie = new Volunteer('Maggie', 'Smith', '123-456-7890', 'Maggie@email.com', ['12-18month'], 'no', 'yes');
var lisa = new Volunteer('Lisa', 'Simpson', '123-456-7890', 'lisa@email.com', ['18-24month'], 'no', 'yes');
var peggy = new Volunteer('Peggy', 'Sue', '123-456-7890', 'peggy@email.com', ['18-24month'], 'yes', 'yes');
var clarabelle = new Volunteer('Clarabelle', 'Cow', '123-456-7890', 'Clarabelle@email.com', ['2-3yrs'], 'no', 'yes');
var Grissella = new Volunteer('Grissella', 'Grimm', '123-456-7890', 'Grissella@email.com', ['2-3yrs'], 'yes', 'yes');
var eleanor = new Volunteer('Eleanor', 'Rigby', '123-456-7890', 'Eleanor@email.com', ['3-4yrs'], 'no', 'yes');
var lizzy = new Volunteer('Lizzy', 'Bennet', '123-456-7890', 'Lizzy@email.com', ['3-4yrs'], 'yes', 'yes');
var maude = new Volunteer('Maude', 'Clark', '123-456-7890', 'Maude@email.com', ['4-5yrs'], 'no', 'yes');
var alice = new Volunteer('Alice', 'Carrol', '123-456-7890', 'Alice@email.com', ['4-5yrs'], 'yes', 'yes');

// Create Demo Substitute List
var rita = new Sub('Rita', 'Maid', '123-456-7890', 'rita@email.com', ['infants','12-18month'], 'no', 'yes');
var aurora = new Sub('Aurora', 'Dresden', '123-456-7890', 'aurora@email.com', ['4-5yrs', '3-4yrs', '2-3yrs'], 'no', 'yes');
var rosey = new Sub('Rosey', 'Cotton', '123-456-7890', 'rosey@mail.com', ['18-24month', 'infants','12-18month'], 'no', 'yes');

$(document).on('ready', function() {
    $('.ui.accordion').accordion();
    $('.ui.dropdown').dropdown();
    $('.ui.checkbox').checkbox();

    $('#main-menu').on('click', '#newSch', function(){
        $('#pick-volunteers').empty();
        $('#pick-volunteers').append(populateVolunteersNewSchedule());
        $('.ui.checkbox').checkbox();
        $('#create-schedule').modal('setting', 'transition', 'horizontal flip').modal('show');
    });

    $('#main-menu').on('click', '#allV', function(){
        $('#all-volunteers').find('tbody').empty();
        $('#all-volunteers').find('tbody').append(populateAllVolunteers());
        $('#all-volunteers').modal('setting', 'transition', 'horizontal flip').modal('show');  
    });

    $('.pop-vol').popup({
        inline: true,
        on: 'click'
    });

    $('#newV').on('click', function(){
        $('#new-volunteer').modal('setting', 'transition', 'horizontal flip').modal('show');
    });
    $('#newS').on('click', function(){
        $('#new-substitute').modal('setting', 'transition', 'horizontal flip').modal('show');
    });
});