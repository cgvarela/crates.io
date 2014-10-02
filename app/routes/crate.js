import Ember from 'ember';
import Version from 'cargo/models/version';

export default Ember.Route.extend({
    model: function(params) {
        var parts = params.crate_id.split('/');
        var crate_id = parts[0];
        var version = null;
        if (parts.length > 0) {
            version = parts[1];
        }
        var a = Ember.RSVP.hash({
            crate: this.store.find('crate', crate_id),
            version: version,
        });
        return a;
    },

    serialize: function(model) {
        if (model instanceof Version) {
            var crate = model.get('crate').get('name');
            return { crate_id: crate + '/' + model.get('num') };
        } else {
            return { crate_id: model.get('id') };
        }
    },
});