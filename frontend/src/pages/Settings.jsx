function Settings() {
  return (
    <div style={{ padding: "30px" }}>
      <h1>⚙ Settings</h1>

      <label>
        <input type="checkbox" />
        Enable Notifications
      </label>

      <br />
      <br />

      <button>Save Settings</button>
    </div>
  );
}

export default Settings;