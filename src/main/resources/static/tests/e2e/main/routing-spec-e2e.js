describe('default route', function () {
    it('should automatically redirect to / when location hash/fragment is empty', function () {
        browser().navigateTo('index.html');
        expect(browser().location().url()).toBe('/');
    });

    it('should automatically redirect to / when location hash/fragment is invalid', function () {
        browser().navigateTo('#/foo-bar-bas');
        expect(browser().location().url()).toBe('/');
    });

    it('should not automatically redirect to / when location hash/fragment is valid', function () {
        browser().navigateTo('#/about');
        expect(browser().location().url()).toBe('/about');
    });
});