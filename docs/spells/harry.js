var spell = 'Expecto Patronum';
var magic = function (spell, intensity) {
    var intense = '';
    for (var i = 0; i < intensity; i = i + 1) {
        intense = intense + '!';
    }
    return spell + intense;
};
var result;
for (var i = 0; i < 10; i = i + 1) {
    result = magic(spell, i);
}
alert(result);

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9jc3BlbmNlL1NvbHV0aW9ucy9wYXJzZWx0b25ndWUvZG9jcy9zcGVsbHMvaGFycnkucHQiXSwibmFtZXMiOlsic3BlbGwiLCJtYWdpYyIsImludGVuc2l0eSIsImludGVuc2UiLCJpIiwicmVzdWx0IiwiYWxlcnQiXSwibWFwcGluZ3MiOiJBQUFBLElBQUFBLEtBQUEsR0FBWSxrQkFBWixDO0FBRUEsSUFBQUMsS0FBQSxhQUFVRCxLQUFWLEVBQW9CRSxTQUFwQixFQUFpQztBQUFBLElBQzdCLElBQUFDLE9BQUEsR0FBYyxFQUFkLENBRDZCO0FBQUEsSUFFN0IsS0FBTSxJQUFBQyxDQUFBLEdBQVEsQ0FBUixDQUFOLENBQU1BLENBQUEsR0FBYUYsU0FBbkIsRUFBTUUsQyxHQUFBQSxDLElBQU4sRUFBK0I7QUFBQSxRQUMzQkQsT0FBQSxHQUFjQSxPLEdBQWEsR0FBM0IsQ0FEMkI7QUFBQSxLQUZGO0FBQUEsSUFLN0IsT0FBR0gsSyxHQUFXRyxPQUFkLENBTDZCO0FBQUEsQ0FBakMsQztBQU9BLElBQUFFLE1BQUEsQztBQUNBLEtBQU0sSUFBQUQsQ0FBQSxHQUFRLENBQVIsQ0FBTixDQUFNQSxDQUFBLEdBQWEsRUFBbkIsRUFBTUEsQyxHQUFBQSxDLElBQU4sRUFBcUI7QUFBQSxJQUNqQkMsTUFBQSxHQUFhSixLQUFBLENBQWFELEtBQWIsRUFBdUJJLENBQXZCLENBQWIsQ0FEaUI7QUFBQSxDO0FBR3JCRSxLQUFBLENBQVlELE1BQVoiLCJzb3VyY2VzQ29udGVudCI6WyJzc3NTcGVsbCA8fiAnRXhwZWN0byBQYXRyb251bSdcblxuc3NzTWFnaWMgW3Nzc1NwZWxsLCBzc3NJbnRlbnNpdHldXG4gICAgc3NzSW50ZW5zZSA8fiAnJ1xuICAgIHNzc3NzIHNzc0kgPH4gMCB+PiBzc3NJbnRlbnNpdHlcbiAgICAgICAgc3NzSW50ZW5zZSA8fiBzc3NJbnRlbnNlICsgJyEnXG5cbiAgICA8fiBzc3NTcGVsbCArIHNzc0ludGVuc2Vcblxuc3NzUmVzdWx0XG5zc3NzcyBzc3NJIDx+IDAgfj4gMTBcbiAgICBzc3NSZXN1bHQgPH4gc3NzTWFnaWMgPH4gW3Nzc1NwZWxsLCBzc3NJXVxuXG5zc3NDYXN0IDx+IFtzc3NSZXN1bHRdXG4iXX0=