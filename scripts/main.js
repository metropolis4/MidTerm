// Volunteer class constructor
// 
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
// 
Volunteer.volunteers = [];

// Sub-class for substitutes
// 
var Sub = function(firstName, lastName, number, email, ages, lead, bckcheck){
    Volunteer.call(this, firstName, lastName, number, email, ages, lead, bckcheck);
    this.sub = true;
    Sub.volunteers.push(this);
};
Sub.prototype = new Volunteer();
Sub.prototype.constructor = Sub;

// All substitutes
// 
Sub.volunteers = [];

// Dates
// 
var ScheduledDate = function(month, day, year, inf, m1218, m1824, yr23, yr34, yr45){
    this.month = month;
    this.day = day;
    this.year = year;
    this.volunteers = 
        {
            inf   : [ 'infants', inf ],
            m1218 : [ '12-18month', m1218 ],
            m1824 : [ '18-24month', m1824 ],
            yr23  : [ '2-3yrs', yr23 ],
            yr34  : [ '3-4yrs', yr34 ],
            yr45  : [ '4-5yrs', yr45 ]
        };
    ScheduledDate.dates.push(this);
};
ScheduledDate.dates = [];

// Helper Functions
// 
var populateNewDates = function(){
    return  _.map(ScheduledDate.dates, function(val){
        var $el = $('.scheduled-date').first().clone();
        $el.removeClass('hiding');
        $el.find('.title-month').text(val.month + ' / ');
        $el.find('.title-day').text(val.day + ' / ');
        $el.find('.title-year').text(val.year);

        _.map(_.values(val.volunteers), function(val){
            var $el2 = $('.scheduled-date-content').first().clone();
            $el2.removeClass('hiding').attr('id', '');
            $el2.find('.scheduled-ages').first().text(val[0]);
            $el2.find('.pop-vol').first().text(val[1]);
            return $el.find('.appended-schedule').append($el2);
        });
        return $el;
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

var populateAllVolunteers = function(array){
    return _.map(array, function(val){
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

var populateAges = function(){
    return _.map(sortVolunteers(Volunteer.volunteers), function(val, key){
        var $el = $('.age-classes').first().clone();
        $el.removeClass('hiding');
        $el.find('label').text(key);
        return $el;
    });
};

var findSub = function(age){
    return _.map(Sub.volunteers, function(val){
        var $el = $('.pop-sub-name').first().clone();
        if(_.indexOf(val.ages, age) !== -1){
            return $el.text(val.fullName);
        }
    });
};

var ageArray = ['infants', '12-18month', '18-24month', '2-3yrs', '3-4yrs', '4-5yrs'];
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
var miss = new Sub('Miss', 'Molly', '123-456-7890', 'miss@email.com', ['4-5yrs', '3-4yrs', '2-3yrs'], 'no', 'yes');
var rosey = new Sub('Rosey', 'Cotton', '123-456-7890', 'rosey@mail.com', ['18-24month', 'infants','12-18month'], 'no', 'yes');
var bathilda = new Sub('Batilda', 'Bagshot', '123-456-7890', 'bathilda@email.com', ['12-18month', '4-5yrs'], 'no', 'yes');

// Create Demo Dates
// 
var march5 = new ScheduledDate('March', 5, 2015, 'Court Rich', 'Maggie Smith', 'Peggy Sue', 'Grissella Grimm', 'Eleanor Rigby', 'Alice Carrol');
var march12 = new ScheduledDate('March', 12, 2015, 'Court Rich', 'Maggie Smith', 'Peggy Sue', 'Grissella Grimm', 'Eleanor Rigby', 'Alice Carrol');
var march19 = new ScheduledDate('March', 19, 2015, 'Court Rich', 'Maggie Smith', 'Peggy Sue', 'Grissella Grimm', 'Eleanor Rigby', 'Alice Carrol');
var march26 = new ScheduledDate('March', 26, 2015, 'Court Rich', 'Maggie Smith', 'Peggy Sue', 'Grissella Grimm', 'Eleanor Rigby', 'Alice Carrol');


$(document).on('ready', function() {

    $('#schedule').find('.accordion').append(populateNewDates());

    // Semantic UI Elements
    $('.ui.accordion').accordion({
        animateChildren: false
    });
    $('.ui.dropdown').dropdown();
    $('.ui.checkbox').checkbox();
    $('.pop-vol').popup({
        inline: true,
        on: 'click',
        transition: 'vertical flip',
        delay: {show: 350, hide: 350}
    });

    $('#main-menu').on('click', '#newSch', function(){
        $('#pick-volunteers').empty();
        $('#pick-volunteers').append(populateVolunteersNewSchedule());
        $('.ui.checkbox').checkbox();
        $('#create-schedule').modal('setting', 'transition', 'horizontal flip').modal('show');
    });

    $('#main-menu').on('click', '#allV', function(){
        $('#all-volunteers').find('tbody').empty();
        $('#all-volunteers').find('tbody').append(populateAllVolunteers(Volunteer.volunteers));
        $('#all-volunteers').modal('setting', 'transition', 'horizontal flip').modal('show');  
    });

    $('#main-menu').on('click', '#allS', function(){      
        $('#all-substitutes').find('tbody').empty();
        $('#all-substitutes').find('tbody').append(populateAllVolunteers(Sub.volunteers));
        $('#all-substitutes').modal('setting', 'transition', 'horizontal flip').modal('show');  
    });

    $('#main-menu').on('click', '#newV', function(){
        $('.age-classes-vol').empty();
        $('.ui.checkbox').checkbox('uncheck');
        $('.age-classes-vol').append(populateAges());
        $('.ui.checkbox').checkbox();
        $('#new-volunteer').modal('setting', 'transition', 'horizontal flip').modal('show');
        $('#submit-new-vol').one('click', function(){
            var fName = $("#first-name").val();
                $('#first-name').val('');
            var lName = $('#last-name').val();
                $('#last-name').val('');
            var phNum = $('#phone').val();
                $('#phone').val('');
            var eMail = $('#email').val();
                $('#email').val('');
            var isLead = $('#lead').checkbox('is checked');
                if(isLead) {isLead = "yes"} else{isLead = "no"};
            var bckCheck = $('#background-check').checkbox('is checked');
                if(bckCheck){bckCheck = 'yes'} else{bckCheck = 'no'};
                console.log(isLead);
            var ageRange = $('.age-classes-vol').find('.ui.checkbox').checkbox('is checked');
            var newVolAges = _.map(_.zip(ageRange, ageArray), function(val){
                if(val[0] === true) { return val[1] }
            });
            newVolAges = _.compact(newVolAges);
            new Volunteer(fName, lName, phNum, eMail, newVolAges, isLead, bckCheck);
        });
    });

    $('#main-menu').on('click', '#newS', function(){
        $('.age-classes-sub').empty();
        $('.ui.checkbox').checkbox('uncheck');
        $('.age-classes-sub').append(populateAges());
        $('.ui.checkbox').checkbox();
        $('#new-substitute').modal('setting', 'transition', 'horizontal flip').modal('show');
        $('#submit-new-sub').one('click', function(){
            var subFirstName = $('.first-name').val();
                $('.first-name').val('');
            var subLastName = $('.last-name').val();
                $('.last-name').val('');
            var subPhone = $('.phone').val();
                $('.phone').val('');
            var subEmail = $('.email').val();
                $('.email').val('');
            var subIsLead = $('.is-lead').checkbox('is checked');
                if(subIsLead) {subIsLead = 'yes'} else{subIsLead = 'no'};
            var subBckCheck = $('.is-bckcheck').checkbox('is checked');
                if(subBckCheck) {subBckCheck = 'yes'} else{subBckCheck = 'no'};
            var ageRange = $('.age-classes-sub').find('.ui.checkbox').checkbox('is checked');
            var newSubAges = _.map(_.zip(ageRange, ageArray), function(val){
                if(val[0] === true) { return val[1] }
            });
            newSubAges = _.compact(newSubAges);
            new Sub(subFirstName, subLastName, subPhone, subEmail, newSubAges, subIsLead, subBckCheck);
        });
    });

    $('.month-list').on('click', '.item', function(){
        var thisMonth = $(this).text();
        $('#month').text(thisMonth);
        console.log('month: ' + month + ' thisMonth: ' + thisMonth);
        if(month === thisMonth) {
            $('.scheduled-date').removeClass('hiding');
        }
        else{
            // $('.scheduled-date').addClass('hiding');
        }
    });

    $('#schedule').on('click', '.sub-needed', function(){
        var subTargetAge = $(this).closest('.find-sub-segment').find('.scheduled-ages').first().text();
        var subTargetVol = $(this).closest('.find-sub-segment').find('.pop-vol').first();
        $(this).find('.menu').empty();
        $(this).find('.menu').first().prepend(findSub(subTargetAge));
        $(this).on('click', '.pop-sub-name', function(){   
            subTargetVol.text($(this).text());
        });
    });
});