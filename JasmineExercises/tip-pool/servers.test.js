describe("Servers test (with setup and tear-down)", function() {
    beforeEach(function () {
        // initialization logic
        serverNameInput.value = 'Alice';
    });

    it('should add a new server to allServers on submitServerInfo()', function () {
        submitServerInfo();

        expect(Object.keys(allServers).length).toEqual(1);
        expect(allServers['server' + serverId].serverName).toEqual('Alice');
    });
    it('should NOT add a new server to allServers on submitServerInfo()',function(){
        serverNameInput.value = '';
        submitServerInfo();

        expect(Object.keys(allServers).length).toEqual(0);
    })

    it('should add new element to table', function(){
        submitServerInfo();
        updateServerTable();
        
        expect(serverTbody.childNodes.length).toEqual(1);
        expect(serverTbody.firstChild.childNodes[0].textContent).toEqual('Alice');
        expect(serverTbody.firstChild.childNodes[1].textContent).toEqual('$0.00');
    })
    afterEach(function() {
        // teardown logic
        serverTbody.innerHTML = ''
        allServers = {};
        serverId = 0;
    });
});
