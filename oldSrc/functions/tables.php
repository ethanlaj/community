<?PHP
require_once(__DIR__."/generalized_functions.php");
// This file contains a partial representation of the database in the form of code. 
// It pulls some data from the database, but most of the human readable data is stored here.

// Notes about how the table objects are created
// Creating a new table:
//    - Argument 1 of the table constructor is the table name
//    - Argument 2 of the table is an array containing human readable names for the database columns. NOTE: The order and number of these columns must match the database exactly
//    - Argument 3 is an array of the names of the database columns that should be displayed to represent a record. IE first and last name for a student, title for a job, etc.
//
// - Adding options to a column makes a dropdown appear on the add/edit form that allows the user to easily select one of the options, or still type in their own
// - Foreign key constraints in the database are disabled, so data regarding foreign keys must be added here
// - The fileName is required so the add/edit form knows what page to redirect to after inserting a record

function getTableNameDict() {
    return ['coaching'=>'Coaching Sessions','company'=>"Industry Partners",'first_destination'=>'First Destinations','internship'=>'Work-Based Learning Experiences','meeting'=>'Meetings','student'=>'Blue Jays','survey'=>'Student Survey'];
}

// Returns a table object for the given table
function getTable($name) {
    switch($name) {
    case 'coaching':
        $coachingTable = new Table('coaching', ['Coaching ID','Blue Jay','Date','Visit Type','For Coursework','Mode','Reason','Position Type','Follow Up Tasks', 'Deadline', 'Notes'], ['studentID', 'date']);
        $coachingTable->addOptionsToCol('positionType',['Internship', 'Employment', 'REU', 'Graduate School', 'Other']);
        $coachingTable->addOptionsToCol('mode',['Virtual', 'In person', 'Other']);
        $coachingTable->addForeignKey('studentID','student');
        $coachingTable->fileName = "coaching.php";
        return $coachingTable;
    
    case 'company':
        $companyTable = new Table('company', ['ID','Name','ID','Address Line 1','Address Line 2','City','State','Zip','Phone Number','Domain','Majors/Concentrations','Engagement Level','Etown Priority Partner','Recruiting events','Guests lectures/workshops','Volunteering with professional skill activities','Capstone projects','Site visits','Sponsorship','Notes'], ['companyName']);
        $companyTable->addOptionsToCol('engagementLevel',['Lead', 'Beginning', 'Developing', 'Strategic', 'Other']);
        $companyTable->fileName = "companies.php";
        return $companyTable;

    case 'contact':
        $contactTable = new Table('contact', ['Contact ID','Industry Partner','First Name','Last Name','Alumni','Job Title','Contact Type','Email','Phone Number','Primary Contact','Company Domain','Industry','Notes'], ['firstName','lastName']);
        $contactTable->addOptionsToCol('contactType',['Employer', 'Community partner', 'Higher ed','Other']);
        $contactTable->addForeignKey('companyID','company');
        $contactTable->fileName = "contacts.php";
        return $contactTable;

    case 'first_destination':
        $first_destinationTable = new Table('first_destination', ['First Destination ID','Industry Partner','Blue Jay','Title','Location','Salary Range','Offer Date','What are you doing after graduation','In EMCS Network','Did you intern at this company?','Relationship to Major(s) and Minor(s)','Matches Career Path','Department','Notes'], ['title']);
        $first_destinationTable->addForeignKey('companyID','company');
        $first_destinationTable->addForeignKey('studentID','student');
        $first_destinationTable->fileName = "first_destinations.php";
        return $first_destinationTable;

    case 'internship':
        $internshipTable = new Table('internship', ['Internship ID','Blue Jay','Industry Partner','Title','Department','Work-based Learning','Start Date','End Date','SLE/Credit','Career Path','Mode','Rating','Wage Range','EMCS Network','Notes'], ['title']);
        $internshipTable->addOptionsToCol('workBasedLearning',['Internship', 'SCARP', 'REU', 'Trade', 'Co-op', 'Field placement', 'Other']);
        $internshipTable->addOptionsToCol('careerPath',['Yes','No','Maybe']);
        $internshipTable->addOptionsToCol('mode',['Virtual', 'In person', 'Hybrid']);
        $internshipTable->addForeignKey('companyID','company');
        $internshipTable->addForeignKey('studentID','student');
        $internshipTable->fileName = "internships.php";
        return $internshipTable;

    case 'meeting':
        $meetingTable = new Table('meeting', ['Meeting ID','Meeting Type','Date','Company','Contact','Etown Contact','Notes','Tasks','Task Deadline'], ['meetingType','date']);
        $meetingTable->addOptionsToCol('meetingType', ['Virtual meeting', 'Phone call', 'On-campus meeting', 'Off-site meeting', 'Campus event']);
        $meetingTable->addForeignKey('companyID','company');
        $meetingTable->addForeignKey('contactID','contact');
        $meetingTable->fileName = "meetings.php";
        return $meetingTable;

    case 'student':
        $studentTable = new Table('student', ['Student ID','First Name','Last Name','Email','Phone Number','Student ID','Grad Year','Alumni','Volunteer','First Gen','Gender','URM','Department','Primary Major','Concentration','Other Majors','Minors','Current Employer', 'Position Title','Notes'], ['firstName','lastName']);
        $studentTable->addOptionsToCol('gender', ['Female', 'Male', 'Non-binary', 'Trans', 'Prefer not to answer', 'Other']);
        $studentTable->addForeignKey('currentEmployer','company');
        $studentTable->fileName = "students.php";
        return $studentTable;

    case 'survey':
        $surveyTable = new Table('survey', ['Survey ID','Survey Type','Submit Date','First Name','Last Name','Student ID','Grad Date','Primary Major','Concentration','For Class Assignment','Work Type','Company','Title','Time Frame','Reason For Completion','Matches Career Path','Mode','Rating','Wage Range','Who Helped','Summer Work Type','Summer Company','Summer Title','Summer Reason For Completion','Summer Wage Range','Summer Who Helped'], ['firstName','lastName','submitDate']);
        $surveyTable->fileName = "survey.php";
        return $surveyTable;
    default:
        return NULL;
    }
}
?>