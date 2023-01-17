export const getRandomSpherePoint = (position, radius = 4) => {
  const p = new THREE.Vector3().copy(position) // new random point

  const u = Math.random()
  const v = Math.random()

  const theta = 2 * Math.PI * u
  const phi = Math.acos(2 * v - 1)

  const spread = radius

  p.x = position.x + radius * Math.sin(phi) * Math.cos(theta) * spread

  p.y = position.y + radius * Math.sin(phi) * Math.sin(theta) * spread

  p.z = position.z + radius * Math.cos(phi) * spread

  return p
}

export const getRandomCirclePoint = (position, radius = 4) => {
  const p = new THREE.Vector3().copy(position) // new random point

  const u = Math.random()
  const v = Math.random()

  const theta = 2 * Math.PI * u
  const phi = Math.acos(2 * v - 1)

  const spread = radius

  p.x = position.x + radius * Math.sin(phi) * Math.cos(theta) * spread

  p.y = position.y + Math.random() * 2

  p.z = position.z + radius * Math.cos(phi) * spread

  return p
}
