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
    Input Text    xpath=//form[@id='loginForm']//input[@name='email']    angelyabut@gmail.com
    Input Text    xpath=//form[@id='loginForm']//input[@name='password']     123456
    Click Button    submitBtn

*** Test Cases ***
Successful upvote of first article
    Login
    Click Link    /articles/search
    Click Element   xpath=//button[@data-upvote="0"]
    Element Text Should Be    xpath=//button[@data-upvote="0"]/span[contains(@id, 'upvoteNum')]    1
    [Teardown]    Close Browser

Successful remove of upvote of first article
    Login
    Click Link    /articles/search
    Click Element   xpath=//button[@data-upvote="0"]
    Element Text Should Be    xpath=//button[@data-upvote="0"]/span[contains(@id, 'upvoteNum')]   0 
    [Teardown]    Close Browser

Successful downvote of first article
    Login
    Click Link    /articles/search
    Click Element   xpath=//button[@data-downvote="0"]
    Element Text Should Be   xpath=//button[@data-downvote="0"]/span[contains(@id, 'downvoteNum')]    1  
    [Teardown]    Close Browser

Successful remove downvote of first article
    Login
    Click Link    /articles/search
    Click Element   xpath=//button[@data-downvote="0"]
    Element Text Should Be    xpath=//button[@data-downvote="0"]/span[contains(@id, 'downvoteNum')]    0  
    [Teardown]    Close Browser

Successful upvote of already downvoted first article
    Login
    Click Link    /articles/search
    Click Element   xpath=//button[@data-downvote="0"]
    Click Element   xpath=//button[@data-upvote="0"]
    Element Text Should Be    xpath=//button[@data-downvote="0"]/span[contains(@id, 'downvoteNum')]   0
    Element Text Should Be    xpath=//button[@data-upvote="0"]/span[contains(@id, 'upvoteNum')]     1  
    [Teardown]    Close Browser

Successful downvote of already upvoted first article
    Login
    Click Link    /articles/search
    Click Element   xpath=//button[@data-upvote="0"]
    Click Element   xpath=//button[@data-downvote="0"]
    Element Text Should Be    xpath=//button[@data-upvote="0"]/span[contains(@id, 'upvoteNum')]   0
    Element Text Should Be    xpath=//button[@data-downvote="0"]/span[contains(@id, 'downvoteNum')]     1  
    [Teardown]    Close Browser

Successful upvote of second article
    Login
    Click Link    /articles/search
    Execute JavaScript    window.scrollTo(0, 500)    
    Click Element   xpath=//button[@data-upvote="1"]
    Element Text Should Be     xpath=//button[@data-upvote="1"]/span[contains(@id, 'upvoteNum')]     1  
    [Teardown]    Close Browser


Successful remove of upvote of second article
    Login
    Click Link    /articles/search
    Execute JavaScript    window.scrollTo(0, 500) 
    Click Element   xpath=//button[@data-upvote="1"]
    Element Text Should Be    xpath=//button[@data-upvote="1"]/span[contains(@id, 'upvoteNum')]    0  
    [Teardown]    Close Browser

Successful downvote of second article
    Login
    Click Link    /articles/search
    Execute JavaScript    window.scrollTo(0, 500) 
    Click Element   xpath=//button[@data-downvote="1"]
    Element Text Should Be    xpath=//button[@data-downvote="1"]/span[contains(@id, 'downvoteNum')]    1  
    [Teardown]    Close Browser

Successful remove downvote of second article
    Login
    Click Link    /articles/search
    Execute JavaScript    window.scrollTo(0, 500) 
    Click Element   xpath=//button[@data-downvote="1"]
    Element Text Should Be    xpath=//button[@data-downvote="1"]/span[contains(@id, 'downvoteNum')]    0  
    [Teardown]    Close Browser

Successful upvote of already downvoted second article
    Login
    Click Link    /articles/search
    Execute JavaScript    window.scrollTo(0, 500) 
    Click Element   xpath=//button[@data-downvote="1"]
    Click Element   xpath=//button[@data-upvote="1"]
    Element Text Should Be    xpath=//button[@data-downvote="1"]/span[contains(@id, 'downvoteNum')]     0
    Element Text Should Be    xpath=//button[@data-upvote="1"]/span[contains(@id, 'upvoteNum')]    1  
    [Teardown]    Close Browser

Successful downvote of already upvoted second article
    Login
    Click Link    /articles/search
    Execute JavaScript    window.scrollTo(0, 500) 
    Click Element   xpath=//button[@data-upvote="1"]
    Click Element   xpath=//button[@data-downvote="1"]
    Element Text Should Be    xpath=//button[@data-upvote="1"]/span[contains(@id, 'upvoteNum')]     0
    Element Text Should Be    xpath=//button[@data-downvote="1"]/span[contains(@id, 'downvoteNum')]    1  
    [Teardown]    Close Browser 