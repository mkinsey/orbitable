module.exports = Body;

function Body(x, y, xx, yy, m, bodyID, userID) {
	this.x = x || 0;
	this.y = y || 0;
    this.xx = xx;
    this.yy = yy;
    this.fx = 0;
    this.fy = 0;
    this.m = m;
    this.c = this.getColor();
    this.bodyID = bodyID;
    this.userID = userID;
}

Body.prototype.addForce = function(fx,fy) {
    this.fx += fx;
    this.fy += fy;

};

Body.prototype.resetForce = function() {
    this.fx = 0;
    this.fy = 0;
};

Body.prototype.applyForce = function(dt,pdt) {

    this.xx += (this.fx/this.m)*dt;
    this.yy += (this.fy/this.m)*dt;
    this.x += this.xx*dt;
    this.y += this.yy*dt;

};

Body.prototype.addMass = function(m) {
    this.m += m;
};

Body.prototype.serializeUpdate = function() {
    return [this.bodyID, Math.round(this.x*100)/100, Math.round(this.y*100)/100];
};
Body.prototype.serializeInitial = function() {
    return [this.bodyID, Math.round(this.x*100)/100, Math.round(this.y*100)/100, this.m, this.c, this.userID];
};

Body.prototype.toString = function() {
    return "ID: " + this.bodyID + " (" + this.x + ", " + this.y + ") m=" + this.m;
};

Body.prototype.getColor = function() {
    return '#'+Math.random().toString(16).substr(-6);
}