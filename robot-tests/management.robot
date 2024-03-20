*** Settings ***
Documentation    A test suite to test if moderators can manage user accounts
...              This test has a workflow that is created using keywords 
...              directly from Selenium Library
Library          SeleniumLibrary

*** Keywords ***
Login
    Open Browser    http://localhost:3000/    Chrome
    Maximize Browser Window
    Set Selenium Speed    .25
    Click Link    /login
    Input Text    xpath=//form[@id='loginForm']//input[@name='email']    tyrone_stamaria@dlsu.edu.ph
    Input Text    xpath=//form[@id='loginForm']//input[@name='password']     123456
    Click Button    submitBtn

*** Test Cases ***
Moderators successfully changed the name of a user
    Login
    Click Link    /moderator/users/list
    Click Element   xpath=//tr[@data-title="glenaestebal@gmail.com"]/td[3]/form
    Input Text    xpath=//form[@id='editAccountForm']//input[@name='firstName']    Glena Marie
    Click Button    submitBtn
    Click Link    /moderator/users/list
    Click Element   xpath=//tr[@data-title="glenaestebal@gmail.com"]/td[3]/form
    Get Text    xpath=//*[@id="firstName"]    
    Should Be Equal    Glena Marie    Glena Marie 
    [Teardown]    Close Browser

Moderators successfully deleted a user
    Login
    Click Link    /moderator/users/list
    Click Element    //tr[@data-title="tyrone.stamaria35@gmail.com"]/td[2]/button
    Click Button    deleteBtn
    Click Link    /moderator/users/list
    Page Should Not Contain    //tr[@data-title="tyrone.stamaria35@gmail.com"]
    [Teardown]    Close Browser

