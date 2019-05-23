<template>
  <v-navigation-drawer disable-resize-watcher :mini-variant="true" mini-variant-width=150 width=372>
  <v-list>
    <v-list-tile>
      <v-list-tile-action>
        <v-icon>home</v-icon>
      </v-list-tile-action>
      <v-list-tile-title>Menu</v-list-tile-title>
    </v-list-tile>
    <v-list-group>
        <template v-slot:activator>
          <v-list-tile>
            <v-list-tile-title>Admin</v-list-tile-title>
          </v-list-tile>
        </template>
        <v-list-tile v-for="(setup, i) in setups" :key="i">
          <router-link :to="setup.to">
            {{ setup.name }}
          </router-link>
        </v-list-tile>
    </v-list-group>
    <v-list-group>
      <template v-slot:activator>
        <v-list-tile>
          <v-list-tile-title>Actions</v-list-tile-title>
        </v-list-tile>
      </template>
      <v-list-tile v-for="(report, i) in reports" :key="i">
        <router-link :to="report.to">
            {{ report.name }}
          </router-link>
      </v-list-tile>
    </v-list-group>
  </v-list>
  </v-navigation-drawer>
</template>

<script>
export default {
  name: 'MenuForm',
  data() {
    return {
      setups: [
        {
          name: 'Set Up 1',
          to: 'setupone',
        },
        {
          name: 'Set Up 2',
          to: 'setuptwo',
        },
        {
          name: 'Set Up 3',
          to: 'setupthree',
        },
      ],
      reports: [
        {
          name: 'Report 1',
          to: 'reportone',
        },
      ],
    };
  },
};
</script>
