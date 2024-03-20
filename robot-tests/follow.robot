*** Settings ***
Documentation    A test suite that tests upvotes and downvotes
...
...              This test has a workflow that is created using keywords 
...              directly from Selenium Library
Library          SeleniumLibrary

*** Keywords ***
Login
    Open Browser    http://localhost:3000/    Chrome
    Maximize Browser Window
    Set Selenium Speed    .25
    Click Link    /login
    Input Text    xpath=//form[@id='loginForm']//input[@name='email']    shannatan@gmail.com
    Input Text    xpath=//form[@id='loginForm']//input[@name='password']     123456
    Click Button    submitBtn

*** Test Cases ***
Successful following Tyrone
    Login
    Click Link    /people
    Click Element  xpath=//a[@data-email="tyrone.stamaria35@gmail.com"]
    Click Element  xpath=//button[@class = 'button']
    Element Text Should Be    xpath=//button[@class = 'button']    Unfollow
    [Teardown]    Close Browser

Looking at Tyrone's Favorite Article
    Login
    Click Link    /people
    Click Element  xpath=//a[@data-email="tyrone.stamaria35@gmail.com"]
    Click Element   xpath=//a[contains(text(), 'Supporting Novice Programmer DevOps Integration')]
    Element Text Should Be   xpath=//h1[@class = 'text-primary']    Supporting Novice Programmer DevOps Integration
    [Teardown]    Close Browser

Looking at Glena's Lack of Favorite Articles

    Login
    Click Link    /people
    Click Element  xpath=//a[@data-email="glenaestebal@gmail.com"]
    Element Text Should Be   xpath=//h3[@class = 'text-dark-2']    This user doesn't have any favorite articles yet. Find other users here
    [Teardown]    Close Browser