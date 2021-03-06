const { Selector, ClientFunction } = require('testcafe');
const { stamp } = require('js-automation-tools');

const randomDigits1 = stamp.getTimestamp();
const randomDigits2 = stamp.resetTimestamp();
const randomDigits3 = stamp.resetTimestamp();
const randomDigits4 = stamp.resetTimestamp();
const randomDigits5 = stamp.resetTimestamp();
const randomDigits6 = stamp.resetTimestamp();
const randomDigits7 = stamp.resetTimestamp();
const randomDigits8 = stamp.resetTimestamp();
const randomDigits9 = stamp.resetTimestamp();

const getPageUrl = ClientFunction(() => {
    return window.location.href;
});

fixture('Redmine log in tests')
    .page('http://demo.redmine.org/');

test('Create a new user', async (t) => {
    await t.click('.register')
        .typeText('#user_login', `test_user_testcafe_poc${randomDigits1}@sharklasers.com`)
        .typeText('#user_password', 'test_user_testcafe_poc')
        .typeText('#user_password_confirmation', 'test_user_testcafe_poc')
        .typeText('#user_firstname', 'test_user')
        .typeText('#user_lastname', 'testcafe_poc')
        .typeText('#user_mail', `test_user_testcafe_poc${randomDigits1}@sharklasers.com`)
        .click('[value="Submit"]')
        .expect(Selector('#flash_notice').innerText).eql('Your account has been activated. You can now log in.');
});

test('Log in', async (t) => {
    await t.click('.login')
        .typeText('#username', `test_user_testcafe_poc${randomDigits1}@sharklasers.com`)
        .typeText('#password', 'test_user_testcafe_poc')
        .click('[name="login"]')
        .expect(Selector('#loggedas').exists).ok();
});

test('Log out', async (t) => {
    await t.click('.login')
        .typeText('#username', `test_user_testcafe_poc${randomDigits1}@sharklasers.com`)
        .typeText('#password', 'test_user_testcafe_poc')
        .click('[name="login"]')
        .click('.logout')
        .expect(Selector('#loggedas').exists).notOk()
        .expect(Selector('.login').exists).ok();
});

fixture('Redmine entities creation tests')
    .page('http://demo.redmine.org/')
    .beforeEach(async (t) => {
        await t.click('.login')
            .typeText('#username', `test_user_testcafe_poc${randomDigits1}@sharklasers.com`)
            .typeText('#password', 'test_user_testcafe_poc')
            .click('[name="login"]');
    });

test('Create a new project', async (t) => {
    await t.click('#top-menu .projects')
        .click('.icon-add')
        .typeText('#project_name', `test_project${randomDigits1}`)
        .click('[value="Create"]')
        .expect(Selector('#flash_notice').innerText).eql('Successful creation.')
        .expect(getPageUrl()).contains(`/projects/test_project${randomDigits1}/settings`);
});

test('Create a new issue', async (t) => {
    await t.click('#top-menu .projects')
        .click('.icon-add')
        .typeText('#project_name', `test_project${randomDigits2}`)
        .click('[value="Create"]')
        .click('#top-menu .projects')
        .click(`[href*="/projects/test_project${randomDigits2}"]`)
        .click('.new-issue')
        .typeText('#issue_subject', `Test issue ${randomDigits2}`)
        .typeText('#issue_description', `Test issue description ${randomDigits2}`)
        .click('#issue_priority_id')
        .click(Selector('#issue_priority_id option').withText('High'))
        .click('[value="Create"]')
        .expect(Selector('#flash_notice').innerText).contains('created.');
});

test('Verify that the issue is displayed on a project page', async (t) => {
    await t.click('#top-menu .projects')
        .click('.icon-add')
        .typeText('#project_name', `test_project${randomDigits3}`)
        .click('[value="Create"]')
        .click('#top-menu .projects')
        .click(`[href*="/projects/test_project${randomDigits3}"]`)
        .click('.new-issue')
        .typeText('#issue_subject', `Test issue ${randomDigits3}`)
        .typeText('#issue_description', `Test issue description ${randomDigits3}`)
        .click('#issue_priority_id')
        .click(Selector('#issue_priority_id option').withText('High'))
        .click('[value="Create"]')
        .click('#top-menu .projects')
        .click(`[href*="/projects/test_project${randomDigits3}"]`)
        .click('#main-menu .issues')
        .expect(Selector('.subject a').innerText).contains(`Test issue ${randomDigits3}`);
});

test('Upload a file', async (t) => {
    await t.click('#top-menu .projects')
        .click('.icon-add')
        .typeText('#project_name', `test_project${randomDigits8}`)
        .click('[value="Create"]')
        .click('#top-menu .projects')
        .click(`[href*="/projects/test_project${randomDigits8}"]`)
        .click('.files')
        .click('.icon-add')
        .setFilesToUpload('input.file_selector', './uploads/test-file.txt')
        .click('[value="Add"]')
        .expect(Selector('.filename').innerText).eql('test-file.txt')
        .expect(Selector('.digest').innerText).eql('d8e8fca2dc0f896fd7cb4cb0031ba249');
});

fixture('Redmine entities editing tests')
????????.page('http://demo.redmine.org/')
    .beforeEach(async (t) => {
        await t.click('.login')
            .typeText('#username', `test_user_testcafe_poc${randomDigits1}@sharklasers.com`)
            .typeText('#password', 'test_user_testcafe_poc')
            .click('[name="login"]');
    });

test('Edit the issue', async (t) => {
    await t.click('#top-menu .projects')
        .click('.icon-add')
        .typeText('#project_name', `test_project${randomDigits4}`)
        .click('[value="Create"]')
        .click('#top-menu .projects')
        .click(`[href*="/projects/test_project${randomDigits4}"]`)
        .click('.new-issue')
        .typeText('#issue_subject', `Test issue ${randomDigits4}`)
        .typeText('#issue_description', `Test issue description ${randomDigits4}`)
        .click('#issue_priority_id')
        .click(Selector('#issue_priority_id option').withText('High'))
        .click('[value="Create"]')
        .click('#top-menu .projects')
        .click(`[href*="/projects/test_project${randomDigits4}"]`)
        .click('#main-menu .issues')
        .click(Selector('.subject a').withText(`Test issue ${randomDigits4}`))
        .click('.icon-edit')
        .selectText('#issue_subject')
        .pressKey('delete')
        .typeText('#issue_subject', `Issue ${randomDigits4} updated`)
        .click('#issue_priority_id')
        .click(Selector('#issue_priority_id option').withText('Normal'))
        .click('[value="Submit"]')
        .expect(Selector('#flash_notice').innerText).eql('Successful update.');
});

test('Verify that the updated issue is displayed on a project page', async (t) => {
    await t.click('#top-menu .projects')
        .click('.icon-add')
        .typeText('#project_name', `test_project${randomDigits5}`)
        .click('[value="Create"]')
        .click('#top-menu .projects')
        .click(`[href*="/projects/test_project${randomDigits5}"]`)
        .click('.new-issue')
        .typeText('#issue_subject', `Test issue ${randomDigits5}`)
        .typeText('#issue_description', `Test issue description ${randomDigits5}`)
        .click('#issue_priority_id')
        .click(Selector('#issue_priority_id option').withText('High'))
        .click('[value="Create"]')
        .click('#top-menu .projects')
        .click(`[href*="/projects/test_project${randomDigits5}"]`)
        .click('#main-menu .issues')
        .click(Selector('.subject a').withText(`Test issue ${randomDigits5}`))
        .click('.icon-edit')
        .selectText('#issue_subject')
        .pressKey('delete')
        .typeText('#issue_subject', `Issue ${randomDigits5} updated`)
        .click('#issue_priority_id')
        .click(Selector('#issue_priority_id option').withText('Normal'))
        .click('[value="Submit"]')
        .click('#main-menu .issues')
        .expect(Selector('.subject a').innerText).eql(`Issue ${randomDigits5} updated`);
});

test('Search for the issue', async (t) => {
    await t.click('#top-menu .projects')
        .click('.icon-add')
        .typeText('#project_name', `test_project${randomDigits6}`)
        .click('[value="Create"]')
        .click('#top-menu .projects')
        .click(`[href*="/projects/test_project${randomDigits6}"]`)
        .click('.new-issue')
        .typeText('#issue_subject', `Test issue ${randomDigits6}`)
        .typeText('#issue_description', `Test issue description ${randomDigits6}`)
        .click('#issue_priority_id')
        .click(Selector('#issue_priority_id option').withText('High'))
        .click('[value="Create"]')
        .navigateTo('http://demo.redmine.org/search')
        .typeText('#search-input', `Test issue ${randomDigits6}`)
        .click('[value="Submit"]')
        .expect(Selector('#search-results').innerText).contains(`Test issue ${randomDigits6}`);
});

fixture('Redmine entities deletion tests')
????????.page('http://demo.redmine.org/')
    .beforeEach(async (t) => {
        await t.click('.login')
            .typeText('#username', `test_user_testcafe_poc${randomDigits1}@sharklasers.com`)
            .typeText('#password', 'test_user_testcafe_poc')
            .click('[name="login"]');
    });

test('Delete the issue', async (t) => {
    await t.click('#top-menu .projects')
        .click('.icon-add')
        .typeText('#project_name', `test_project${randomDigits7}`)
        .click('[value="Create"]')
        .click('#top-menu .projects')
        .click(`[href*="/projects/test_project${randomDigits7}"]`)
        .click('.new-issue')
        .typeText('#issue_subject', `Test issue ${randomDigits7}`)
        .typeText('#issue_description', `Test issue description ${randomDigits7}`)
        .click('#issue_priority_id')
        .click(Selector('#issue_priority_id option').withText('High'))
        .click('[value="Create"]')
        .click('#top-menu .projects')
        .click(`[href*="/projects/test_project${randomDigits7}"]`)
        .click('#main-menu .issues')
        .click(Selector('.subject a').withText(`Test issue ${randomDigits7}`))
        .setNativeDialogHandler(() => true)
        .click('.icon-del')
        .expect(Selector('.subject a').withText(`Test issue ${randomDigits7}`).exists).notOk()
        .expect(Selector('.nodata').innerText).eql('No data to display');
});

test('Delete the file', async (t) => {
    await t.click('#top-menu .projects')
        .click('.icon-add')
        .typeText('#project_name', `test_project${randomDigits9}`)
        .click('[value="Create"]')
        .click('#top-menu .projects')
        .click(`[href*="/projects/test_project${randomDigits9}"]`)
        .click('.files')
        .click('.icon-add')
        .setFilesToUpload('input.file_selector', './uploads/test-file.txt')
        .click('[value="Add"]')
        .click('#top-menu .projects')
        .click(`[href*="/projects/test_project${randomDigits9}"]`)
        .click('.files')
        .setNativeDialogHandler(() => true)
        .click(Selector('.filename a').withText('test-file.txt').parent('.file').find('.buttons a').withAttribute('data-method', 'delete'))
        .expect(Selector('.filename').withText('test-file.txt').exists).notOk()
        .expect(Selector('.digest').withText('d8e8fca2dc0f896fd7cb4cb0031ba249').exists).notOk();
});
